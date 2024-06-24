import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/JwtServices";
import {
  customersRole,
  employeesRole,
  eventsRole,
  inboxRole,
  invoiceRole,
  ordersRole,
  productsRole,
} from "./mock/navMenu";

const AUTH_PAGES = ["/", "/register"];

const isAuthPage = (url: string) =>
  AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request: NextRequest, response: NextResponse) {
  const { nextUrl, cookies, url } = request;
  const token = cookies.get("token")?.value;
  const path = nextUrl.pathname;
  const isAuthPageRequest = isAuthPage(path);
  const tokenValid = await verifyToken(token);
  const sendDashboard = NextResponse.redirect(new URL("/dashboard", url));
  const send403 = NextResponse.redirect(new URL("/dashboard/403", url));

  if (isAuthPageRequest) {
    if (!tokenValid) {
      return NextResponse.next();
    }
    return sendDashboard;
  }

  if (!tokenValid) {
    const serachParams = new URLSearchParams(nextUrl.searchParams);
    serachParams.set("next", path);
    return NextResponse.redirect(new URL(`/?${serachParams.toString()}`, url));
  }
  const role = (tokenValid.payload as unknown as jwtUserDecode).role as string;
  const customerWithId = path.match(/\/dashboard\/customer\/\d+/);

  if (customerWithId && !customersRole.includes(role)) {
    return sendDashboard;
  }

  switch (path) {
    case "/dashboard/products":
      if (!productsRole.includes(role)) {
        return send403;
      }
      break;
    case "/dashboard/inbox":
      if (!inboxRole.includes(role)) {
        return send403;
      }
      break;
    case "/dashboard/order":
      if (!ordersRole.includes(role)) {
        return send403;
      }
      break;
    case "/dashboard/employees":
      if (!employeesRole.includes(role)) {
        return send403;
      }
      break;
    case "/dashboard/customer":
      if (!customersRole.includes(role)) {
        return send403;
      }
      break;
    case "/dashboard/invoice":
      if (!invoiceRole.includes(role)) {
        return send403;
      }
      break;
    case "/dashboard/events":
      if (!eventsRole.includes(role)) {
        return send403;
      }
      break;
    default:
      break;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
