import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/toc";
import Link from "next/link";
import CodeBlock from "@/components/code-block";

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

  const components = {
    pre: ({ children, ...props }: any) => {
      console.log('=== PRE TAG CALLED ===');
      console.log('children:', children);
      console.log('children type:', typeof children);
      console.log('children.props:', children?.props);
      console.log('props:', props);
      
      // 文字列を抽出する関数
      const extractText = (element: any): string => {
        if (typeof element === 'string') {
          return element;
        }
        if (element?.props?.children) {
          if (typeof element.props.children === 'string') {
            return element.props.children;
          }
          if (Array.isArray(element.props.children)) {
            return element.props.children.map(extractText).join('');
          }
          return extractText(element.props.children);
        }
        return '';
      };
      
      const codeContent = extractText(children);
      console.log('Extracted code content:', codeContent.substring(0, 100));
      
      if (codeContent.trim()) {
        console.log('Using CodeBlock component');
        return <CodeBlock showCopyButton={true}>{codeContent}</CodeBlock>;
      }
      
      console.log('Using fallback pre');
      return <pre className="bg-gray-100 p-4 rounded overflow-x-auto font-mono text-sm" {...props}>{children}</pre>;
    },
    code: ({ children, className, ...props }: any) => {
      console.log('=== CODE TAG CALLED ===');
      console.log('children:', children);
      console.log('className:', className);
      
      // インラインコードの場合のみ処理
      if (!className || !className.startsWith('language-')) {
        return (
          <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }
      
      // ブロックコードの場合はそのまま返す（preで処理される）
      return <code className={className} {...props}>{children}</code>;
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
            <MDXRemote source={content} options={options} components={components} />
          </div>
          {/* ここに「戻る」「次へ」ボタンを追加 */}
          <div className="flex justify-between mt-8">
            {prevSlug ? (
              <Link
                href={`/post/${prevSlug}`}
                className="px-4 py-2 bg-gray-200 font-bold rounded hover:bg-gray-300"
              >
                戻る
              </Link>
            ) : <span />}
            {nextSlug ? (
              <Link
                href={`/post/${nextSlug}`}
                className="px-4 py-2 bg-blue-500 font-bold text-white rounded hover:bg-blue-600"
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