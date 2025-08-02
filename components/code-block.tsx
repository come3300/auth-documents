"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  children: string;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  // 言語を抽出（例：className="language-javascript" → "javascript"）
  let language = className?.replace('language-', '') || 'text';
  
  // PHPコードかどうかを判定（<?phpで始まる場合）
  if (language === 'text' || !language) {
    if (children.trim().startsWith('<?php')) {
      language = 'php';
    } else if (children.includes('docker-compose') || children.includes('version:')) {
      language = 'yaml';
    } else if (children.includes('FROM ') || children.includes('RUN ')) {
      language = 'dockerfile';
    } else if (children.includes('echo ') || children.includes('require_once')) {
      language = 'php';
    } else {
      language = 'bash';
    }
  }
  
  // デバッグ情報をコンソールに出力
  console.log('CodeBlock called with:', { 
    childrenPreview: children.substring(0, 50), 
    className, 
    detectedLanguage: language 
  });
  
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-300">
      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-300 border-b">
        {language}
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
        }}
        showLineNumbers={false}
        wrapLines={true}
        wrapLongLines={true}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}