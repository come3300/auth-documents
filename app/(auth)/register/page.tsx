import { buttonVariants } from "@/components/ui/button";
import UserSignUpForm from "@/components/user-sign-up-form";
import { cn } from "@/libs/utils";
import Link from "next/link";

export default function Register() {
  return (
    <div className="container grid flex-col  h-screen w-screen items-center justify-center lg:max-w-none lg:px-0">
      <Link
        href={"/"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 md:left-8 md:top-8"
        )}
      >
        戻る
      </Link>
      <div className="mx-auto w-full sm:w-[350px] flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            アカウントの作成
          </h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスを入力してアカウント作成してください。
          </p>
        </div>

        <UserSignUpForm />

        <p className="text-muted-foreground px-8 text-center text-sm">
          続けてクリックすれば私たちの
          <Link href={"/terms"} className="underline underline-offset-4">
            利用規約
          </Link>
          と
          <Link href={"/privacy"} className="underline underline-offset-4">
            プライバシーポリシー
          </Link>
          に同意したことになります。
        </p>
      </div>
    </div>
  );
}
