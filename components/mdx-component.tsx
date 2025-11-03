"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Callout from "./callout";
import CodeBlock from "./code-block";
import Note from "./note";
import InfoBox from "./info-box";

const components = {
  Image,
  Callout,
  Note,
  InfoBox,
  pre: ({ children, ...props }: any) => {
    // preタグの中のcodeタグを取得
    const codeElement = children?.props;
    if (codeElement && codeElement.children && typeof codeElement.children === 'string') {
      return (
        <CodeBlock className={codeElement.className} showCopyButton={true}>
          {codeElement.children}
        </CodeBlock>
      );
    }
    return <pre {...props}>{children}</pre>;
  },
  code: ({ children, className, ...props }: any) => {
    // インラインコードの場合
    if (!className) {
      return (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }
    // ブロックコードの場合は既にpreで処理されているので、そのまま返す
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

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose lg:prose-xl max-w-full">
      <Component components={components} />
    </div>
  );
}
