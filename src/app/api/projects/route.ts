import { getServerAuthSession } from "@/helpers/auth-server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Create a new project
export async function POST(req: NextRequest) {
  try {
    // Check Authentication
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    // Parse Body
    const body = await req.json();

    const { title, description } = body;

    // Validation
    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and Description are required",
        },
        {
          status: 400,
        },
      );
    }

    // Find User
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    // User Not Found
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    // Credit Check
    if (user.credits <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "You don't have enough credits",
        },
        {
          status: 403,
        },
      );
    }

    // Create Project
    const project = await prisma.project.create({
      data: {
        title,
        description,
        userId: user.id,
      },
    });

    // Deduct Credit
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    // Success Response
    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        project,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Create Project Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

// Get all projects for the authenticated user
export async function GET(req: NextRequest) {
  try {
    // Check Authentication
    const session = await getServerAuthSession();
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }
    // Find User
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    // Get all projects for the authenticated user
    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        projects,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Get Projects Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

// Delete a project and its related chat/messages for the authenticated user
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          message: "Project ID is required",
        },
        {
          status: 400,
        },
      );
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
      select: {
        id: true,
        chat: {
          select: {
          id: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.$transaction(async (tx) => {
      if (project.chat) {
        await tx.message.deleteMany({
          where: {
            chatId: project.chat.id,
          },
        });

        await tx.chat.delete({
          where: {
            projectId: project.id,
          },
        });
      }

      await tx.project.delete({
        where: {
          id: project.id,
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project deleted successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Delete Project Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
