import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@api/api";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    const authHeader = request.headers.get("authorization");
    const acceptLanguage = request.headers.get("accept-language");
    const contentType = request.headers.get("content-type");

    // 1. Susun header secara dinamis seperti pada rute POST (/me)
    const headers: Record<string, string> = {};

    if (authHeader) headers["Authorization"] = authHeader;
    if (acceptLanguage) headers["accept-language"] = acceptLanguage;
    if (contentType) headers["Content-Type"] = contentType;

    // 2. Baca payload sebagai ArrayBuffer agar aman saat menerima file biner maupun teks JSON
    const bodyBuffer = await request.arrayBuffer();

    const response = await fetch(API_ENDPOINTS.MATERIALS.UPDATE(id), {
      method: "PATCH",
      headers: headers,
      credentials: "include",
      body: bodyBuffer, // Mengirimkan buffer biner mentah ke backend utama
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Material update integration error:`, error);
    return NextResponse.json(
      { message: "Unable to connect to server" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    const authHeader = _request.headers.get("authorization");
    const acceptLanguage = _request.headers.get("accept-language");

    const response = await fetch(API_ENDPOINTS.MATERIALS.DELETE(id), {
      method: "DELETE",
      headers: {
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("authorization");
    const acceptLanguage = request.headers.get("accept-language");

    const response = await fetch(API_ENDPOINTS.MATERIALS.GET_BY_ID(id), {
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
