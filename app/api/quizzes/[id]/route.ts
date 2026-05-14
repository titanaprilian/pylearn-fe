import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@api/api";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    const authHeader = request.headers.get("authorization");
    const acceptLanguage = request.headers.get("accept-language");

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "Quiz ID is required" },
        { status: 400 },
      );
    }

    const response = await fetch(API_ENDPOINTS.QUIZZES.DETAIL(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
        ...(acceptLanguage && { "accept-language": acceptLanguage }),
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to connect to server" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("authorization");
    const acceptLanguage = request.headers.get("accept-language");

    const body = await request.json();

    const response = await fetch(API_ENDPOINTS.QUIZZES.UPDATE(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
        ...(acceptLanguage && { "accept-language": acceptLanguage }),
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to connect to server" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("authorization");
    const acceptLanguage = request.headers.get("accept-language");

    const response = await fetch(API_ENDPOINTS.QUIZZES.DELETE(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
        ...(acceptLanguage && { "accept-language": acceptLanguage }),
      },
      credentials: "include",
    });

    let data = {};
    if (response.status !== 204) {
      data = await response.json();
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to connect to server" },
      { status: 500 },
    );
  }
}
