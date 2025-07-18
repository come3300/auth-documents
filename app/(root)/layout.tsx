import SiteFooter from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/libs/utils";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="container z-40 bg-background">
        <div className="h-20 py-6 flex items-center justify-between">
          {/* TODO 👇前の認証ボタン 不要だったらこのファイル削除する*/}
          {/* <MainNav items={marketingConfig.mainNav} /> */}
          <nav>
            {/* <Link
              href={"/login"}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              ログイン
            </Link> */}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
