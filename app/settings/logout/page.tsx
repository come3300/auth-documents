import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Logout from '@/components/logout'
import type { Database } from '@/libs/database.types'

export const dynamic = "force-dynamic";

// ログアウトページ
const LogoutPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // ユーザー情報の取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 未認証の場合、リダイレクト
  if (!user) {
    redirect('/')
  }

  return <Logout />
}

export default LogoutPage