import Image from "next/image";

const HomePage = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {[
            {
              id: 1,
              imgSrc: "/images/home-imgs/tutorial_ホーム画像.png",
              category: "Phase1",
              title: "チュートリアル",
              description:
                "これから学習するにあたっての考え方,ツールのダウンロードを行い開発環境を整える。",
              views: "1.2K",
              comments: "6",
              linksrc: "/documents/lists/phase1/tutorial",
            },
            // 他の投稿データ...
          ].map((post) => (
            <div key={post.id} className="p-4 md:w-1/4">
              <div className="h-full border-1 border-opacity-60 rounded-lg overflow-hidden">
                <Image
                  className="w-full object-cover object-center"
                  src={post.imgSrc}
                  alt={post.title}
                  width={400} // 適切な幅を指定
                  height={300} // 適切な高さを指定
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {post.category}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {post.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{post.description}</p>
                  <div className="flex items-center flex-wrap">
                    <a
                      href={post.linksrc}
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      一覧へ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;