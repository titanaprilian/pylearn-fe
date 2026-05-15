import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@api/api";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const acceptLanguage = request.headers.get("accept-language");
    const contentType = request.headers.get("content-type");

    const headers: Record<string, string> = {};

    if (authHeader) headers["Authorization"] = authHeader;
    if (acceptLanguage) headers["accept-language"] = acceptLanguage;

    if (contentType) {
      headers["Content-Type"] = contentType;
    }

    const bodyBuffer = await request.arrayBuffer();

    const response = await fetch(API_ENDPOINTS.MATERIALS.CREATE, {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: bodyBuffer,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Material creation integration error:", error);
    return NextResponse.json(
      { message: "Unable to connect to server" },
      { status: 500 },
    );
  }
}

