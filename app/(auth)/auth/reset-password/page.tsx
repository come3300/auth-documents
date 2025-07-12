import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import ResetPassword from '@/components/reset-password'
import type { Database } from '@/libs/database.types'

export const dynamic = "force-dynamic";

// パスワードリセットページ
const ResetPasswordPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // ユーザー情報の取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 認証している場合、リダイレクト
  if (user) {
    redirect('/')
  }

  return <ResetPassword />
}

export default ResetPasswordPage