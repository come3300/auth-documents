import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/libs/utils";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <section className="pt-6 md:pt-10 lg:py-32 pb-8 md:pb-12">
        <div className="container text-center flex flex-col items-center gap-4 max-w-[64rem]">
          <h1 className="font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Programing Study
          </h1>
          <p className="text-muted-foreground sm:text-xl leading-normal max-w-[42rem]">
            プログラミング学習を支援するためのリソースとツールを提供します。<br />
            初心者から上級者まで、誰でも利用できる学習コンテンツです。
          </p>
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
              // target="_blank"
              // rel="noreferrer"
            >
              サインアップ  
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
