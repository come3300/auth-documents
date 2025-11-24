# auth-documents

## プロジェクト概要

このプロジェクトは、プログラミング学習用の教材を管理・配信するWebアプリケーションです。Next.js、NextAuth.js、Prismaを使用し、MDX形式で作成された教材コンテンツを提供します。

## ディレクトリ構成について

```text
auth-documents/
├── app/                      # Next.js 13+ App Router
│   ├── (auth)/              # 認証関連ページ（ログイン、サインアップなど）
│   ├── (editor)/            # エディター機能
│   ├── (root)/              # ルートページ
│   ├── api/                 # APIルート
│   ├── courses/             # コース一覧・詳細ページ
│   ├── post/                # 投稿詳細ページ
│   └── settings/            # 設定ページ
├── components/              # Reactコンポーネント
│   ├── ui/                  # Radix UI、shadcn/uiベースのUIコンポーネント
│   ├── mdx-component.tsx    # MDXコンテンツのレンダリングコンポーネント
│   ├── editor.tsx           # Editor.js統合コンポーネント
│   └── ...                  # その他のコンポーネント
├── config/                  # 設定ファイル
│   ├── site.ts             # サイト全体の設定
│   ├── dashboard.ts        # ダッシュボードのナビゲーション設定
│   └── marketing.ts        # マーケティングページの設定
├── contents/                # MDXコンテンツ
│   └── posts/              # 教材記事（カテゴリ別に整理）
│       ├── php-todo/       # PHPのTODOアプリ教材
│       ├── php-memo/       # PHPのメモアプリ教材
│       ├── js-basic/       # JavaScript基礎教材
│       ├── nextjs-basic/   # Next.js基礎教材
│       ├── laravel-memo/   # Laravelメモアプリ教材
│       ├── sql-basic/      # SQL基礎教材
│       └── ...             # その他の教材カテゴリ
├── data/                    # 静的データ
│   ├── courses.ts          # コース情報の定義
│   └── lessons/            # レッスン情報
├── libs/                    # ユーティリティ・ライブラリ
│   ├── auth.ts             # NextAuth設定
│   ├── db.ts               # Prismaクライアント
│   ├── session.ts          # セッション管理
│   └── validations/        # バリデーションスキーマ（Zod）
├── prisma/                  # Prismaスキーマ・マイグレーション
│   ├── schema.prisma       # データベーススキーマ定義
│   └── migrations/         # マイグレーションファイル
├── public/                  # 静的ファイル
│   └── images/             # 画像ファイル
├── store/                   # Zustand状態管理
├── types/                   # TypeScript型定義
└── contentlayer.config.ts  # Contentlayer設定
```

## 使用技術

### フレームワーク・ライブラリ

- **Next.js 13.5+**: React フレームワーク（App Router使用）
- **React 18**: UIライブラリ
- **TypeScript**: 型安全な開発

### 認証

- **NextAuth.js 4.24+**: 認証ライブラリ
- **@next-auth/prisma-adapter**: PrismaとNextAuthの連携

### データベース

- **Prisma 5.13+**: ORMツール
- **PostgreSQL**: データベース（Supabase使用）

### コンテンツ管理

- **Contentlayer 0.3.4**: MDXコンテンツ管理
- **next-mdx-remote 5.0+**: MDXのリモートレンダリング
- **gray-matter**: フロントマター解析
- **remark-gfm**: GitHub Flavored Markdown対応
- **rehype-highlight**: シンタックスハイライト
- **rehype-slug**: 見出しにIDを自動付与

### エディター

- **Editor.js 2.29+**: ブロックエディター
- **@editorjs/header**: 見出しブロック
- **@editorjs/list**: リストブロック
- **@editorjs/code**: コードブロック
- **@editorjs/link**: リンクブロック

### UI・スタイリング

- **Tailwind CSS 3.4+**: CSSフレームワーク
- **@tailwindcss/typography**: タイポグラフィプラグイン
- **Radix UI**: アクセシブルなUIプリミティブ
- **shadcn/ui**: UIコンポーネントライブラリ
- **Lucide React**: アイコンライブラリ
- **React Icons**: アイコンライブラリ

### フォーム・バリデーション

- **React Hook Form 7.51+**: フォーム管理
- **Zod 3.23+**: スキーマバリデーション
- **@hookform/resolvers**: バリデーション統合

### その他

- **Zustand 5.0+**: 軽量状態管理
- **date-fns 3.6+**: 日付操作
- **tocbot**: 目次生成
- **@supabase/auth-helpers-nextjs**: Supabase認証ヘルパー

## 環境構築

### 必要な環境

- Node.js 18以上
- npm または yarn
- PostgreSQLデータベース（Supabaseを推奨）

### セットアップ手順

1. リポジトリをクローン

   ```bash
   git clone <repository-url>
   cd auth-documents
   ```

2. 依存パッケージをインストール

   ```bash
   npm install
   ```

3. 環境変数の設定

   `.env`ファイルをプロジェクトルートに作成し、以下の環境変数を設定してください。

   ```bash
   # データベース接続（Supabase）
   DATABASE_URL="postgresql://..."
   DIRECT_URL="postgresql://..."

   # NextAuth設定
   NEXTAUTH_URL="http://localhost:3006"
   NEXTAUTH_SECRET="your-secret-key"

   # OAuth認証（使用する場合）
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"

   # Supabase設定（画像アップロード等で使用）
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   ```

4. Prismaのセットアップ

   ```bash
   # Prismaクライアントを生成
   npx prisma generate

   # データベースマイグレーション実行
   npx prisma migrate dev
   ```

5. 開発サーバーを起動

   ```bash
   npm run dev
   ```

   ブラウザで [http://localhost:3006](http://localhost:3006) を開いてアクセスできます。

### その他のコマンド

```bash
# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# Lintチェック
npm run lint

# Prisma Studio起動（データベースGUI）
npx prisma studio
```

## 当プロジェクトでのMDXの書き方について

### ファイルの配置場所

MDXファイルは `contents/posts/` ディレクトリ配下にカテゴリ別に配置します。

```text
contents/posts/
├── php-basic/
│   ├── step1.mdx
│   ├── step2.mdx
│   └── ...
├── js-basic/
│   ├── step1.mdx
│   └── ...
└── ...
```

### MDXファイルの基本構造

各MDXファイルには、フロントマター（メタデータ）とコンテンツ本文を記述します。

```mdx
---
title: "記事のタイトル"
description: "記事の説明文"
date: "2024-01-01"
published: true
image: "/images/sample.png"
---

# 見出し1

本文をここに記述します。

## 見出し2

Markdownの標準記法が使用できます。

### コードブロック

\`\`\`javascript
const hello = () => {
  console.log("Hello, World!");
};
\`\`\`
```

### フロントマターの項目

| 項目 | 必須 | 説明 |
|------|------|------|
| `title` | ✅ | 記事のタイトル |
| `description` | ❌ | 記事の説明文（SEO用） |
| `date` | ✅ | 公開日（YYYY-MM-DD形式） |
| `published` | ❌ | 公開状態（デフォルト: true） |
| `image` | ✅ | サムネイル画像パス |

### 使用可能なMarkdown記法

- **見出し**: `#`, `##`, `###`（自動的にIDが付与され、目次生成に使用されます）
- **リスト**: `-`（箇条書き）、`1.`（番号付き）
- **コードブロック**: バッククォート3つで囲む（言語指定でシンタックスハイライト）
- **強調**: `**太字**`, `*斜体*`
- **リンク**: `[テキスト](URL)`
- **画像**: `![代替テキスト](画像パス)`
- **引用**: `>`
- **テーブル**: GFM（GitHub Flavored Markdown）形式

### カスタムコンポーネント

プロジェクトでは以下のカスタムコンポーネントが利用可能です（[mdx-component.tsx](components/mdx-component.tsx)で定義）。

- `Callout`: 注意書きやヒントを強調表示
- `Note`: メモやポイントを記載
- `InfoBox`: 補足情報を表示

使用例：

```mdx
<Callout>
  重要な情報をここに記載します。
</Callout>

<Note>
  ポイントやメモをここに記載します。
</Note>
```

### シンタックスハイライト

コードブロックには言語を指定することでシンタックスハイライトが適用されます。

対応言語例：

- `javascript` / `js`
- `typescript` / `ts`
- `python`
- `php`
- `sql`
- `bash` / `shell`
- `html`
- `css`
- `json`

### 画像の配置

画像は `public/images/` ディレクトリに配置し、MDX内では絶対パスで参照します。

```mdx
![説明テキスト](/images/course-name/image.png)
```

### レッスンの番号付け

ファイル名は `step1.mdx`, `step2.mdx` のように番号を付けて順序を管理します。

### 特定の見出しに遷移する方法

下記のように記載すると`<section id="from-mac">`へ遷移することができる

```mdx
[Macの方はこちらから](#from-mac)

<section id="from-mac">
```
