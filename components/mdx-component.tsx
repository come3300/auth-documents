"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Callout from "./callout";
import CodeBlock from "./code-block";

const components = {
  Image,
  Callout,
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
};

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose lg:prose-xl max-w-full">
      <Component components={components} />
    </div>
  );
}
