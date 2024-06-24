import { NextRequest, NextResponse } from "next/server";

interface MojangApiErrorResponse {
  error: string;
  errorMessage: string;
}

interface MojangApiResponse {
  name: string;
  id: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { message: "Username not specified" },
      { status: 400 },
    );
  }

  const endpoint = `https://api.mojang.com/users/profiles/minecraft/${username}`;

  try {
    const response = await fetch(endpoint, { method: "GET" });

    if (!response.ok) {
      if (response.status === 204) {
        return NextResponse.json(
          { message: "Username does not exist in Mojang database" },
          { status: 204 },
        );
      }
      const errorData: MojangApiErrorResponse = await response.json() as MojangApiErrorResponse;
      return NextResponse.json(
        { message: errorData.errorMessage || "Error fetching UUID" },
        { status: response.status },
      );
    }

    const data: MojangApiResponse = await response.json() as MojangApiResponse;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching UUID:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
