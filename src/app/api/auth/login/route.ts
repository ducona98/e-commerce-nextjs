import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { email, password } = await req.json();

    if (email === "admin@example.com" && password === "password123") {
      const token = "fake-jwt-token";

      return NextResponse.json(
        { token, message: "Login successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
