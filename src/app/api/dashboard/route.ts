import { getServerAuthSession } from "@/helpers/auth-server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        credits: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const totalProjects = await prisma.project.count({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        totalProjects,
        creditsRemaining: user.credits,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Dashboard Summary Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
