import React from "react";
import { posts } from "@/data/posts";
import Card from "@/components/ui/card";

type PhasePageProps = {
  params: {
    phase: string;
  };
};

// 動的にフェーズごとのパスを生成
export async function generateStaticParams() {
  return Object.keys(posts).map((phase) => ({
    phase,
  }));
}

const PhasePage: React.FC<PhasePageProps> = ({ params }) => {
  const phasePosts = posts[params.phase as keyof typeof posts];

  if (!phasePosts) {
    return <div>フェーズが見つかりません。</div>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {phasePosts.map((post) => (
            <Card key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhasePage;