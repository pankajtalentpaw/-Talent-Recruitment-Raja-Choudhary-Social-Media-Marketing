import { NextResponse } from "next/server";
import {
  createAdminSession,
  hasAdminSession,
  isCorrectAdminPassword,
  removeAdminSession,
} from "@/lib/adminAuth";

export async function GET() {
  try {
    return NextResponse.json({ authenticated: await hasAdminSession() });
  } catch {
    return NextResponse.json(
      { error: "Admin authentication is not configured." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: unknown };
    const password = typeof body.password === "string" ? body.password : "";

    if (!isCorrectAdminPassword(password)) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 },
      );
    }

    await createAdminSession();
    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json(
      { error: "Admin authentication is not configured." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  await removeAdminSession();
  return NextResponse.json({ authenticated: false });
}
