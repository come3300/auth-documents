// import React from "react";
// import { posts } from "@/data/materials";
// import Image from "next/image";
// import Link from "next/link";

// type materialPageProps = {
//   params: {
//     material: string;
//   };
// };

// // 動的にフェーズごとのパスを生成
// export async function generateStaticParams() {
//   return Object.keys(posts).map((material) => ({
//     material,
//   }));
// }

// const materialPage: React.FC<materialPageProps> = ({ params }) => {
//   const materialPosts = posts[params.material as keyof typeof posts];

//   if (!materialPosts) {
//     return <div>フェーズが見つかりません。</div>;
//   }

//   return (
//     <section className="text-gray-600 body-font">
//       <div className="container px-5 py-24 mx-auto">
//         <div className="flex flex-wrap -m-4">
//           {materialPosts.map((post) => (
//             <div key={post.id} className="p-4 md:w-1/3">
//               <div className="h-full border rounded-lg overflow-hidden">
//                 <Image
//                   src={post.imgSrc}
//                   alt={post.title}
//                   width={400}
//                   height={250}
//                   className="w-full object-cover object-center"
//                 />
//                 <div className="p-6">
//                   <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
//                     {post.category}
//                   </h2>
//                   <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
//                     {post.title}
//                   </h1>
//                   <p className="leading-relaxed mb-3">{post.description}</p>
//                   <div className="flex items-center flex-wrap">
//                     <Link
//                       href={post.linksrc}
//                       className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
//                     >
//                       詳細へ
//                     </Link>
//                     <span className="text-gray-400 ml-3 text-sm">
//                       👁 {post.views}💬 {post.comments}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default materialPage;

import React from "react";
import { posts } from "@/data/materials";
import Card from "@/components/ui/card";

type materialPageProps = {
  params: {
    material: string;
  };
};

// 動的にフェーズごとのパスを生成
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
        <div className="flex flex-wrap -m-4">
          {materialPosts.map((post) => (
            <Card key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default materialPage;