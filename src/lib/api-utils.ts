import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import type { Role } from "@prisma/client";

export async function createErrorResponse(message: string, status: number) {
  return NextResponse.json(
    { success: false, error: message },
    { status }
  );
}

export async function createSuccessResponse(data: any, status: number = 200) {
  return NextResponse.json(
    { success: true, data },
    { status }
  );
}

export async function withAuth(
  handler: (
    req: NextRequest,
    session: any,
    params?: any
  ) => Promise<NextResponse>
) {
  return async (req: NextRequest, { params }: any) => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return createErrorResponse("Unauthorized", 401);
    }

    return handler(req, session, params);
  };
}

export async function withRoleAuth(
  handler: (
    req: NextRequest,
    session: any,
    params?: any
  ) => Promise<NextResponse>,
  ...roles: Role[]
) {
  return async (req: NextRequest, { params }: any) => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return createErrorResponse("Unauthorized", 401);
    }

    if (!roles.includes(session.user.role as Role)) {
      return createErrorResponse("Forbidden", 403);
    }

    return handler(req, session, params);
  };
}

export async function validateRequestBody(req: NextRequest, schema: any) {
  try {
    const body = await req.json();
    const validated = schema.parse(body);
    return { valid: true, data: validated };
  } catch (error: any) {
    return {
      valid: false,
      error: error.message || "Invalid request body",
    };
  }
}

export function validateQueryParams(
  searchParams: URLSearchParams,
  params: Record<string, any>
) {
  const errors: Record<string, string> = {};

  for (const [key, validator] of Object.entries(params)) {
    const value = searchParams.get(key);
    // Add validation logic here
  }

  return Object.keys(errors).length === 0
    ? { valid: true }
    : { valid: false, errors };
}

export function rateLimitKey(req: NextRequest, userId?: string) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";
  return userId ? `${userId}:${ip}` : ip;
}
