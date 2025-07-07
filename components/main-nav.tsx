"use client";
 {/* TODO 👇前の認証機能つきヘッダー 不要だったらこのファイル削除する */}
import { NavItem } from "@/types";
import Link from "next/link";
import { ReactNode, useState } from "react";
import MobileNav from "./mobile-nav";
import type { Session } from "@supabase/auth-helpers-nextjs";

interface MainNavProps {
  items: NavItem[];
  children?: ReactNode;
  session: Session | null; 
}

export default function MainNav({ items, session }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="py-5 container px-5 mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          Programing Learning
        </Link>
        <nav className="hidden md:flex gap-6">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-lg sm:text-sm font-medium hover:text-foreground/80"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <span>メニュー</span>
        </button>
        {showMobileMenu && <MobileNav items={items} />}
        <div className="text-sm font-bold">
          {session ? (
            <div className="flex items-center space-x-5">
              <Link href="/settings/profile">
                <div>プロフィール</div>
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
  );
}