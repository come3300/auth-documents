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
};

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose lg:prose-xl max-w-full">
      <Component components={components} />
    </div>
  );
}
