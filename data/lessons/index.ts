import { jsBasicLessons } from './js-basic';
import { phpBasicLessons } from './php-basic';
import { nextjsBasicLessons } from './nextjs-basic';
import { phpTodoLessons } from './php-todo';
import { phpMemoLessons } from './php-memo';
import { linuxLessons } from './linux';
import { githubBasicLessons } from './github-basic';
import { internetBasicLessons } from './internet-basic';
import { tutorialLessons } from './tutorial';
import { websiteLessons } from './website';
import { laravelMemoLessons } from './laravel-memo';

export const lessons = {
  'js-basic': jsBasicLessons,
  'php-basic': phpBasicLessons,
  'nextjs-basic': nextjsBasicLessons,
  'php-todo': phpTodoLessons,
  'php-memo': phpMemoLessons,
  linux: linuxLessons,
  'github-basic': githubBasicLessons,
  'internet-basic': internetBasicLessons,
  tutorial: tutorialLessons,
  website: websiteLessons,
  'laravel-memo': laravelMemoLessons,
};

// 型定義のエクスポート
export type LessonKey = keyof typeof lessons;
