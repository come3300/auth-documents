import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/toc";
import Link from "next/link";
import CodeBlock from "@/components/code-block";
import Note from "@/components/note";
import InfoBox from "@/components/info-box";

interface LessonPageProps {
  params: {
    course: string;
    lesson: string;
  };
}

export async function generateStaticParams() {
  const slugs = GetAllPostSlugs();
  const params: { course: string; lesson: string; }[] = [];

  for (const slug of slugs) {
    const parts = slug.split('/');
    if (parts.length === 2) {
      const [course, lesson] = parts;
      params.push({ course, lesson });
    }
  }

  return params;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const slug = `${params.course}/${params.lesson}`;

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  };

  const components = {
    Note,
    InfoBox,
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
    // 見出しスタイル（標準的なMarkdown形式）
    h1: ({ children, ...props }: any) => (
      <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-900" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-lg font-bold mt-4 mb-3 text-gray-900" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: any) => (
      <h4 className="text-base font-bold mt-4 mb-2 text-gray-900" {...props}>
        {children}
      </h4>
    ),
    // 順序なしリスト（標準的なMarkdown形式）
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc pl-6 my-4 space-y-1" {...props}>
        {children}
      </ul>
    ),
    // 順序ありリスト（標準的なMarkdown形式）
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal pl-6 my-4 space-y-1" {...props}>
        {children}
      </ol>
    ),
    // リストアイテム（標準的なMarkdown形式）
    li: ({ children, ...props }: any) => (
      <li className="text-gray-700 leading-relaxed" {...props}>
        {children}
      </li>
    ),
    // 表（Table）
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead className="bg-gray-100" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: any) => (
      <tbody {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: any) => (
      <tr className="border-b border-gray-300" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: any) => (
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props}>
        {children}
      </td>
    ),
    // 引用（Blockquote）
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic text-gray-700 bg-gray-50" {...props}>
        {children}
      </blockquote>
    ),
    // リンク（Link）
    a: ({ children, href, ...props }: any) => (
      <a
        href={href}
        className="text-blue-600 underline hover:text-blue-800 transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    ),
  };

  const { content, data } = GetPostBySlug(slug);

  // 全記事slug一覧を取得
  const allSlugs = GetAllPostSlugs();

  // 同じコース内の記事のみをフィルタリング
  const courseSlugs = allSlugs.filter((s) => s.startsWith(`${params.course}/`));
  const currentIndex = courseSlugs.findIndex((s) => s === slug);

  // 前後のslugを判定（同じコース内のみ）
  const prevSlug = currentIndex > 0 ? courseSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < courseSlugs.length - 1 ? courseSlugs[currentIndex + 1] : null;

  // 新しいURL形式での前後のリンクを生成
  const generateLessonUrl = (slug: string) => {
    const parts = slug.split('/');
    if (parts.length === 2) {
      return `/courses/${parts[0]}/lessons/${parts[1]}`;
    }
    return `/post/${slug}`;
  };

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
                href={generateLessonUrl(prevSlug)}
                className="px-4 py-2 bg-gray-200 font-bold rounded hover:bg-gray-300"
              >
                戻る
              </Link>
            ) : <span />}
            {nextSlug ? (
              <Link
                href={generateLessonUrl(nextSlug)}
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