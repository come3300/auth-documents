'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Navigation from './navigation'
import type { Database } from '@/libs/database.types'

// プロフィール型を定義
type ProfileType = Database['public']['Tables']['profiles']['Row']

// 認証状態の監視
const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  // ユーザー情報の取得（getSession→getUserに修正）
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // プロフィールの取得
  let profile: ProfileType | null = null
  if (user) {
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    profile = currentProfile

    // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== user.email) {
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ email: user.email })
        .match({ id: user.id })
        .select('*')
        .single()

      profile = updatedProfile
    }
  }

    return <Navigation user={user} profile={profile} />
}

export default SupabaseListener