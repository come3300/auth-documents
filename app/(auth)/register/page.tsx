import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import Signupform from "@/components/user-sign-up-form"; 
import Signup from '@/components/signup'// サインアップフォームコンポーネント
import type { Database } from "@/libs/database.types";

const SignupPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 認証している場合、リダイレクト
  if (session) {
    redirect("/");
  }

  return (
    <div className="container grid flex-col h-screen w-screen items-center justify-center lg:max-w-none lg:px-0">
      <div className="mx-auto w-full sm:w-[350px] flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            アカウントの作成
          </h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスを入力してアカウント作成してください。
          </p>
        </div>

        <Signup />

        <p className="text-muted-foreground px-8 text-center text-sm">
          続けてクリックすれば私たちの
          <a href="/terms" className="underline underline-offset-4">
            利用規約
          </a>
          と
          <a href="/privacy" className="underline underline-offset-4">
            プライバシーポリシー
          </a>
          に同意したことになります。
        </p>
      </div>
    </div>
  );
};

export default SignupPage;