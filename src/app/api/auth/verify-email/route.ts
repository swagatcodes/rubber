import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    const email = req.nextUrl.searchParams.get("email");

    if (!token || !email) {
      return NextResponse.json(
        { success: false, error: "Missing token or email" },
        { status: 400 }
      );
    }

    // Find verification token
    const verificationRecord = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: decodeURIComponent(email),
          token: token,
        },
      },
    });

    if (!verificationRecord) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (verificationRecord.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: verificationRecord.identifier,
            token: verificationRecord.token,
          },
        },
      });

      return NextResponse.json(
        { success: false, error: "Token expired" },
        { status: 400 }
      );
    }

    // Update user email verification
    await prisma.user.update({
      where: { email: decodeURIComponent(email) },
      data: { emailVerified: new Date() },
    });

    // Delete verification token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: verificationRecord.identifier,
          token: verificationRecord.token,
        },
      },
    });

    return NextResponse.json(
      { success: true, message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
