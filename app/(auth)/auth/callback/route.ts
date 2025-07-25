import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/libs/database.types'

export const dynamic = "force-dynamic"; 

// サインアップ後のリダイレクト先
export async function GET(request: NextRequest) {
  // URL取得
  const requestUrl = new URL(request.url)
  // 認証コード取得
  const code = requestUrl.searchParams.get('code')

  if (code) {
    // Supabaseのクライアントインスタンスを作成
    const supabase = createRouteHandlerClient<Database>({ cookies })
    // 認証コードをセッショントークンに交換
    await supabase.auth.exchangeCodeForSession(code)
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin;
  return NextResponse.redirect(siteUrl);
}