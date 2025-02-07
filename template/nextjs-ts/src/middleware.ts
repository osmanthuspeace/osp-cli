import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = true;
  if (request.nextUrl.pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      return NextResponse.redirect(new URL("/api/auth/login", request.url));
    }
  }
  return NextResponse.next();
};
