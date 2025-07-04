import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Email from '@/components/email'
import type { Database } from '@/libs/database.types'


export const dynamic = "force-dynamic";

// メールアドレス変更ページ
const EmailPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/')
  }

  return <Email email={session.user.email!} />
}

export default EmailPage