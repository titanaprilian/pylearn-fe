import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@api/api";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const acceptLanguage = request.headers.get("accept-language");

    const quizLevelId = request.nextUrl.searchParams.get("quizLevelId");

    if (!quizLevelId) {
      return NextResponse.json(
        { message: "quizLevelId parameter is required" },
        { status: 400 },
      );
    }

    const response = await fetch(
      API_ENDPOINTS.QUIZZES.GET_QUESTIONS_FOR_ATTEMPT(quizLevelId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader && { Authorization: authHeader }),
          ...(acceptLanguage && { "accept-language": acceptLanguage }),
        },
        credentials: "include",
      },
    );

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
