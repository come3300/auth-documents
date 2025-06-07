import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import type { NextRequest } from "next/server";
import type { Database } from "@/libs/database.types";

export default withAuth(
  async function middleware(req) {
    const res = NextResponse.next();

    // Supabase セッションの取得
    const supabase = createMiddlewareClient<Database>({ req, res });
    await supabase.auth.getSession();

    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/phase-lists", req.url));
      }

      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return res;
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path",
    "/editor/:path",
    "/login",
    "/register",
    "/phase-lists",
  ],
};