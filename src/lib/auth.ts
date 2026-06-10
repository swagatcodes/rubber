import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const result = credentialsSchema.parse(credentials);

          const user = await prisma.user.findUnique({
            where: { email: result.email },
            include: { profile: true },
          });

          if (!user || !user.password) {
            return null;
          }

          if (!user.emailVerified) {
            throw new Error("Email not verified");
          }

          if (!user.isActive) {
            throw new Error("Account disabled");
          }

          // Check login attempts
          if (user.loginAttempts >= 5) {
            const lastAttempt = user.lastFailedLoginAt
              ? new Date().getTime() - user.lastFailedLoginAt.getTime()
              : 0;
            const fifteenMinutes = 15 * 60 * 1000;

            if (lastAttempt < fifteenMinutes) {
              throw new Error("Too many login attempts. Please try again later.");
            }
          }

          const isPasswordCorrect = await bcrypt.compare(
            result.password,
            user.password
          );

          if (!isPasswordCorrect) {
            // Increment failed login attempts
            await prisma.user.update({
              where: { id: user.id },
              data: {
                loginAttempts: user.loginAttempts + 1,
                lastFailedLoginAt: new Date(),
              },
            });
            return null;
          }

          // Reset login attempts and update last login
          await prisma.user.update({
            where: { id: user.id },
            data: {
              loginAttempts: 0,
              lastLoginAt: new Date(),
            },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
    ...(process.env.GOOGLE_ID
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET || "",
          }),
        ]
      : []),
    ...(process.env.GITHUB_ID
      ? [
          GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET || "",
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    newUser: "/auth/signup",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.emailVerified = (user as any).emailVerified;
      }

      if (trigger === "update" && session) {
        token.name = session.name;
        token.image = session.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async signIn({ user }) {
      console.log(`User ${user?.email} signed in`);
    },
    async signOut({ token }) {
      console.log(`User ${token?.email} signed out`);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
