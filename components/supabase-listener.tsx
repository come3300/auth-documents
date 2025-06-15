'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Navigation from './navigation'
import type { Database } from '@/libs/database.types'

const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // プロフィールの取得
  let profile: Database['public']['Tables']['profiles']['Row'] | null = null
  if (session) {
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    profile = currentProfile
  }

  return <Navigation session={session} profile={profile} />
}

export default SupabaseListener