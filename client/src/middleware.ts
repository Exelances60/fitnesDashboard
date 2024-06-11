import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/JwtServices";

const AUTH_PAGES = ["/", "/register"];

const isAuthPage = (url: string) =>
  AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request: NextRequest, response: NextResponse) {
  const { nextUrl, cookies, url } = request;
  const token = cookies.get("token")?.value;
  const path = nextUrl.pathname;
  const isAuthPageRequest = isAuthPage(path);
  const tokenValid = await verifyToken(token);

  console.log("Token Valid:", tokenValid);
  console.log("Is Auth Page Request:", isAuthPageRequest);

  if (isAuthPageRequest) {
    if (!tokenValid) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/dashboard", url));
  }

  if (!tokenValid) {
    const serachParams = new URLSearchParams(nextUrl.searchParams);
    serachParams.set("next", path);
    return NextResponse.redirect(new URL(`/?${serachParams.toString()}`, url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
