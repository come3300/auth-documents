'use client'

import Link from 'next/link'
import useStore from '@/store'
import Image from 'next/image'
import { useEffect } from 'react'
import type { User } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/libs/database.types'
type ProfileType = Database['public']['Tables']['profiles']['Row']

// ナビゲーション
const Navigation = ({
  user,
  profile,
}: {
  user: User | null
  profile: ProfileType | null
}) => {
  const { setUser } = useStore()

  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: user ? user.id : '',
      email: user ? user.email! : '',
      name: profile ? profile.name : '',
      introduce: profile ? profile.introduce : '',
      avatar_url: profile ? profile.avatar_url : '',
    })
  }, [user, setUser, profile])

  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="py-5 px-5 container max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          Programing Learning
        </Link>

        <div className="text-sm font-bold">
          {user ? (
            <div className="flex items-center space-x-5">
              <Link href="/material-lists">教材一覧</Link>
              <Link href="/settings/profile">マイページ</Link>
              <Link href="/settings/profile">
                <div className="relative w-10 h-10">
                  <Image
                    src={profile && profile.avatar_url ? profile.avatar_url : '/default.png'}
                    className="rounded-full object-cover"
                    alt="avatar"
                    fill
                  />
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/login">ログイン</Link>
              <Link href="/register">サインアップ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navigation