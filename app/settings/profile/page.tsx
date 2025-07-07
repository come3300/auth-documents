import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Profile from '@/components/profile'
import type { Database } from '@/libs/database.types'

export const dynamic = "force-dynamic";

const ProfilePage = async () => {
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

  return <Profile />
}

export default ProfilePage