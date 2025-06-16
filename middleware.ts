
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/libs/database.types'

export async function middleware(req: NextRequest) {
 const res = NextResponse.next()
 const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (req.url.includes('_next')) return;
  if (!session && !req.url.includes('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (session && req.url.includes('/login')) {
    return NextResponse.redirect(new URL('/', req.url));
  }
 return res
}

// export const config = {
//   matcher: [
//     "/dashboard/:path",
//     "/editor/:path",
//     "/login",
//     "/register",
//     "/phase-lists",
//   ],
// };