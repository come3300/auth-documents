import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/toc";
import Link from "next/link";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = GetAllPostSlugs();
  return slugs.map((slug) => ({ params: { slug } }));
}

export default async function PostPage({ params }: PostPageProps) {
  // slugが配列の場合は結合
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  };
  const { content, data } = GetPostBySlug(slug);

    // 全記事slug一覧を取得
  const allSlugs = GetAllPostSlugs();
  const currentIndex = allSlugs.findIndex((s) => s === slug);

  // 前後のslugを判定
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;


  return (
    <div>
      <div className="prose-xl flex justify-center mx-auto p-8 bg-[#EDF2F7]">
        <div className="w-9/12">
          <h1 className="flex justify-left mt-8 font-bold text-5xl">{data.title}</h1>
          <div className="post bg-white p-8">
            <MDXRemote source={content} options={options} />
          </div>
          {/* ここに「戻る」「次へ」ボタンを追加 */}
          <div className="flex justify-between mt-8">
            {prevSlug ? (
              <Link
                href={`/post/${prevSlug}`}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                戻る
              </Link>
            ) : <span />}
            {nextSlug ? (
              <Link
                href={`/post/${nextSlug}`}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                次へ
              </Link>
            ) : <span />}
          </div>
        </div>
        <div className="w-3/12">
          <Toc />
        </div>
      </div>
    </div>
  );
}