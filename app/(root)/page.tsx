import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/libs/database.types";

export const dynamic = "force-dynamic";

// メインページ
const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // ユーザー情報の取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <section className="pt-6 md:pt-10 lg:py-32 pb-8 md:pb-12">
        <div className="container text-center flex flex-col items-center gap-4 max-w-[64rem]">
          <h1 className="font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Programing Learning
          </h1>
          <p className="text-muted-foreground sm:text-xl leading-normal max-w-[42rem]">
            プログラミング学習を支援するためのリソースとツールを提供します。
            <br />
            初心者から上級者まで、誰でも利用できる学習コンテンツです。
          </p>
          {!user && (
            <div className="space-x-4">
              <Link
                href={"/login"}
                className={cn(buttonVariants({ size: "lg" }))}
              >
                ログイン
              </Link>
              <Link
                href={"/register"}
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                サインアップ
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;