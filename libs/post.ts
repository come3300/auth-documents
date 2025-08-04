import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";
import matter from "gray-matter";

// MDXファイルのディレクトリ
const POSTS_PATH = path.join(process.cwd(), "contents/posts");

// 再帰的にファイルパスを取得
function getAllMdxFiles(dir: string): string[] {
  let results: string[] = [];
  const list = readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMdxFiles(filePath));
    } else if (/\.mdx?$/.test(file)) {
      results.push(filePath);
    }
  });
  return results;
}

// ファイル名（slug）の一覧を取得
export function GetAllPostSlugs() {
  const postFilePaths = getAllMdxFiles(POSTS_PATH);
  return postFilePaths.map((filePath) => {
    // slug例: php-memo/sample-post
    return path.relative(POSTS_PATH, filePath).replace(/\.mdx?$/, "");
  });
}

// slugからファイルの中身を取得
export function GetPostBySlug(slug: string) {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const markdown = readFileSync(filePath, "utf8");
  const { content, data } = matter(markdown);
  return {
    content,
    data,
  };
}