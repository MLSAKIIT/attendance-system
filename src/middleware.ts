import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const url = new URL("/api/auth/get-session", process.env.BETTER_AUTH_URL);
  const req = await fetch(url, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const data = await req.json();
  if (!data) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/scanner", "/details/:id"],
};
