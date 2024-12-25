import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { email, password } = await req.json();

    if (email === "admin@example.com" && password === "password123") {
      const token = "fake-jwt-token";

      const response = NextResponse.json(
        { token, message: "Sign In successful" },
        { status: 200 }
      );

      const oneDay = 60 * 60 * 24;

      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: oneDay,
      });

      return response;
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
