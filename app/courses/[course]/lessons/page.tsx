import React from "react";
import { lessons } from "@/data/lessons";
import Card from "@/components/ui/card";

type LessonsPageProps = {
  params: {
    course: string;
  };
};

// マッピング用の関数
const getCourseKey = (course: string): keyof typeof lessons | null => {
  const courseMapping: Record<string, keyof typeof lessons> = {
    'js-basic': 'js-basic',
    'php-basic': 'php-basic',
    'nextjs-basic': 'nextjs-basic',
    'php-todo': 'php-todo',
    'php-memo': 'php-memo',
  };
  return courseMapping[course] || null;
};

export async function generateStaticParams() {
  const courses = ['js-basic', 'php-basic', 'nextjs-basic', 'php-todo', 'php-memo'];
  return courses.map((course) => ({
    course,
  }));
}

const LessonsPage: React.FC<LessonsPageProps> = ({ params }) => {
  const courseKey = getCourseKey(params.course);

  if (!courseKey || !lessons[courseKey]) {
    return <div>コースが見つかりません。</div>;
  }

  const coursePosts = lessons[courseKey];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coursePosts.map((post) => (
            <Card key={post.id} {...post} stepLabel={`step${post.id}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LessonsPage;