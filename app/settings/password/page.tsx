import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Password from '@/components/password'
import type { Database } from '@/libs/database.types'

export const dynamic = "force-dynamic";

// パスワード変更ページ
const PasswordPage = async () => {
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

  return <Password />
}

export default PasswordPage