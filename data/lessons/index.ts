import { jsBasicLessons } from './js-basic';
import { phpBasicLessons } from './php-basic';
import { nextjsBasicLessons } from './nextjs-basic';
import { phpTodoLessons } from './php-todo';
import { phpMemoLessons } from './php-memo';

export const lessons = {
  'js-basic': jsBasicLessons,
  'php-basic': phpBasicLessons,
  'nextjs-basic': nextjsBasicLessons,
  'php-todo': phpTodoLessons,
  'php-memo': phpMemoLessons,
};

// 型定義のエクスポート
export type LessonKey = keyof typeof lessons;