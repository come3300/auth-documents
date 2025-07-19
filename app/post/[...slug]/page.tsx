import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/toc";  // Tocコンポーネントを追加

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

  return (
    <div>
      <div className="prose-xl flex justify-center mx-auto p-8 bg-[#EDF2F7]">
        {/* proseではなくprose-xlを使用 */}
        <div className="w-9/12">
          <h1 className="flex justify-left mt-8 font-bold text-5xl">{data.title}</h1>
          <div className="post bg-white p-8">
            <MDXRemote source={content} options={options} />
          </div>
        </div>
        <div className="w-3/12">
          <Toc />
        </div>
      </div>
    </div>
  );
}