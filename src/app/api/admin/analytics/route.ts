import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function isAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user?.role === "ADMIN";
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !(await isAdmin(session.user.id))) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const timeframe = req.nextUrl.searchParams.get("timeframe") || "month"; // month, week, year

    let startDate = new Date();
    if (timeframe === "week") {
      startDate.setDate(startDate.getDate() - 7);
    } else if (timeframe === "month") {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (timeframe === "year") {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    // Get analytics data
    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const totalRevenue = await prisma.order.aggregate({
      _sum: { total: true },
    });

    const newUsers = await prisma.user.count({
      where: { createdAt: { gte: startDate } },
    });

    const newOrders = await prisma.order.count({
      where: { createdAt: { gte: startDate } },
    });

    const recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });

    // Top products
    const topProducts = await prisma.product.findMany({
      take: 5,
      where: { featured: true },
      orderBy: { reviews: "desc" },
    });

    // User stats
    const usersByRole = await prisma.user.groupBy({
      by: ["role"],
      _count: true,
    });

    // Order status distribution
    const orderStatus = await prisma.order.groupBy({
      by: ["status"],
      _count: true,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          summary: {
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenue._sum.total || 0,
            newUsers,
            newOrders,
          },
          recentOrders,
          topProducts,
          usersByRole,
          orderStatus,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get analytics error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
