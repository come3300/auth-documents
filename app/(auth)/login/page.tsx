import UserAuthForm from "@/components/user-login-form";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import type { Database } from "@/libs/database.types";
import Login from '@/components/login'

export const dynamic = "force-dynamic";

const LoginPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // ユーザー情報の取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 認証している場合、リダイレクト
  if (user) {
    redirect("/");
  }

  return (
    <div className="container flex flex-col  h-screen items-center w-screen mt-14">
      <div className="mx-auto w-full sm:w-[350px] flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">ログイン</h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスを入力してログインできます。
          </p>
        </div>

        <Login />

        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link href={"/register"} className="underline underline-offset-4">
            アカウントを持っていませんか？
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;