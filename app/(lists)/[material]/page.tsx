import React from "react";
import { posts } from "@/data/materials";
import Card from "@/components/ui/card";

type materialPageProps = {
  params: {
    material: string;
  };
};

export async function generateStaticParams() {
  return Object.keys(posts).map((material) => ({
    material,
  }));
}

const materialPage: React.FC<materialPageProps> = ({ params }) => {
  const materialPosts = posts[params.material as keyof typeof posts];

  if (!materialPosts) {
    return <div>フェーズが見つかりません。</div>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {materialPosts.map((post) => (
            <Card key={post.id} {...post} stepLabel={`step${post.id}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default materialPage;