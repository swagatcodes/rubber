import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, validateEmail, validatePassword, generateVerificationToken } from "@/lib/auth-utils";
import { sendEmail, getVerificationEmailHtml } from "@/lib/email";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: "Password requirements not met",
          details: passwordValidation.errors,
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        profile: {
          create: {},
        },
      },
    });

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token: verificationToken,
        expires: expiresAt,
        type: "email-verification",
      },
    });

    // Send verification email
    const verificationLink = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
    await sendEmail({
      to: email,
      subject: "Verify your email address",
      html: getVerificationEmailHtml(name, verificationLink),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created. Please check your email to verify.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
