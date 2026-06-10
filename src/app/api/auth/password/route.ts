import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, generateVerificationToken, validatePassword } from "@/lib/auth-utils";
import { sendEmail, getPasswordResetEmailHtml } from "@/lib/email";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Return success even if user doesn't exist (security)
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: "If an account exists, a reset link has been sent",
        },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token: resetToken,
        expires: expiresAt,
        type: "password-reset",
      },
    });

    // Send reset email
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: getPasswordResetEmailHtml(user.name || "User", resetLink),
    });

    return NextResponse.json(
      {
        success: true,
        message: "If an account exists, a reset link has been sent",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

const resetPasswordSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  newPassword: z.string().min(8),
});

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    const { email, token, newPassword } = result.data;

    // Validate password strength
    const passwordValidation = validatePassword(newPassword);
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

    // Find and validate token
    const verificationRecord = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email.toLowerCase(),
          token: token,
        },
      },
    });

    if (!verificationRecord || verificationRecord.type !== "password-reset") {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (verificationRecord.expires < new Date()) {
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

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { password: hashedPassword },
    });

    // Delete token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: verificationRecord.identifier,
          token: verificationRecord.token,
        },
      },
    });

    return NextResponse.json(
      { success: true, message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
