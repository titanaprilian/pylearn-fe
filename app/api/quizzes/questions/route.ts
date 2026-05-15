import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@api/api";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const acceptLanguage = request.headers.get("accept-language");
    const quizLevelId = request.nextUrl.searchParams.get("quizLevelId");

    if (!quizLevelId) {
      return NextResponse.json(
        { message: "quizLevelId is required" },
        { status: 400 },
      );
    }

    console.log("Headers being sent to backend:", {
      Authorization: authHeader,
      AcceptLanguage: acceptLanguage,
    });

    const response = await fetch(API_ENDPOINTS.QUIZZES.QUESTIONS(quizLevelId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
        ...(acceptLanguage && { "accept-language": acceptLanguage }),
      },
      credentials: "include",
    });
    console.log("QUIZ LEVEL ID", quizLevelId);
    const data = await response.json();

    console.log("BACKEND ERROR DATA:", data);

    if (!response.ok) {
      console.log(response);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("NEXT_JS_API_CRASH:", error); // <-- Add this to see if Next.js itself is breaking
    return NextResponse.json(
      { message: "Unable to connect to server" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const acceptLanguage = request.headers.get("accept-language");
    const body = await request.json();

    const { quizLevelId, questionText, answerText } = body;
    if (!quizLevelId || !questionText || !answerText) {
      return NextResponse.json(
        {
          message:
            "quizLevelId, questionText, and answerText are required fields",
        },
        { status: 400 },
      );
    }

    const response = await fetch(API_ENDPOINTS.QUIZZES.CREATE_QUESTION(), {
      method: "POST",
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

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to connect to server" },
      { status: 500 },
    );
  }
}
