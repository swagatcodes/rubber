export { default as NextAuth } from "next-auth";
export type { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }

  interface Session {
    user: User & {
      id: string;
      role: string;
      emailVerified?: boolean;
    };
  }

  interface JWT {
    id: string;
    role: string;
    emailVerified?: boolean;
  }
}
