import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function getCurrentSession() {
  return await getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getCurrentSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireRole(...roles: Role[]) {
  const session = await requireAuth();
  if (!roles.includes(session.user?.role as Role)) {
    throw new Error("Insufficient permissions");
  }
  return session;
}

export async function isAdmin() {
  const session = await getCurrentSession();
  return session?.user?.role === "ADMIN";
}

export async function isModerator() {
  const session = await getCurrentSession();
  return ["ADMIN", "MODERATOR"].includes(session?.user?.role || "");
}
