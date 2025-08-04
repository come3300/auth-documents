"use client";

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  children: string;
  className?: string;
  showCopyButton?: boolean;
}

export default function CodeBlock({ children, className, showCopyButton = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
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
  
  // 言語に応じたアイコンを取得
  const getLanguageIcon = (lang: string) => {
    const icons: { [key: string]: string } = {
      javascript: '🟨',
      typescript: '🔷',
      python: '🐍',
      php: '🐘',
      java: '☕',
      go: '🐹',
      rust: '🦀',
      css: '🎨',
      html: '🌐',
      json: '📄',
      yaml: '📋',
      dockerfile: '🐳',
      bash: '💻',
      shell: '💻',
      sql: '🗄️',
    };
    return icons[lang.toLowerCase()] || '📝';
  };

  return (
    <div className="group my-6 rounded-xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-4 py-3 border-b border-slate-600/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
            </div>
            <div className="flex items-center space-x-2 ml-3">
              <span className="text-lg">{getLanguageIcon(language)}</span>
              <span className="text-slate-300 font-medium text-sm capitalize">{language}</span>
            </div>
          </div>
          {showCopyButton && (
            <button
              onClick={copyToClipboard}
              className="group/btn flex items-center space-x-2 bg-slate-700/80 hover:bg-slate-600/80 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md backdrop-blur-sm border border-slate-600/30"
            >
              <svg className="w-4 h-4 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {copied ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                )}
              </svg>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}
        </div>
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            fontWeight: '500',
            fontFamily: '"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '0',
          }}
          showLineNumbers={false}
          wrapLines={true}
          wrapLongLines={true}
          codeTagProps={{
            style: {
              textShadow: '0 0 2px rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          {children.trim()}
        </SyntaxHighlighter>
        {/* 装飾的なグラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-500/5 pointer-events-none rounded-b-xl"></div>
      </div>
    </div>
  );
}