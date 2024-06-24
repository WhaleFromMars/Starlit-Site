import { NextResponse } from "next/server";
import { hasUserPlayed } from "~/server/db/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid");

  if (!uuid || typeof uuid !== "string") {
    return NextResponse.json({ error: "Invalid UUID" }, { status: 400 });
  }

  try {
    const userExists = await hasUserPlayed(uuid);
    return NextResponse.json({ exists: userExists }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
