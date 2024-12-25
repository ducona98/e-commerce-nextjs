import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect("/sign-in");

  response.cookies.set("token", "", { path: "/", maxAge: 0 });

  return response;
}
