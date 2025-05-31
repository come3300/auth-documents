import { link } from 'fs';
import React from 'react';

const HomePage = () => {
  return (
    <section className="text-gray-600 body-font">
      {/* コンテナ */}
      <div className="container px-5 py-24 mx-auto">
        {/* カード全体をラップするFlexボックス */}
        <div className="flex flex-wrap -m-4">
          {[
            {
              id: 1,
              imgSrc: 'images/home-imgs/tutorial_ホーム画像.png',
              category: 'Phase1',
              title: 'チュートリアル',
              description:
                'これから学習するにあたっての考え方,ツールのダウンロードを行い開発環境を整える。',
              views: '1.2K',
              comments: '6',
              linksrc: '/images/documents/lists/phase1/tutorial',
            },
            {
              id: 2,
              imgSrc: 'images/home-imgs/Github_ホーム画像.png',
              category: 'Phase1',
              title: 'Github 入門',
              description:
                'GitHubの基本的な考え方を学び、グローバルへプッシュするまでの一連の流れを実践していく。',
              views: '1.2K',
              comments: '6',
              linksrc: '/documents/lists/phase1/github',
            },
            {
              id: 3,
              imgSrc: 'images/home-imgs/Internet_ホーム画像.png',
              category: 'Phase1',
              title: 'インターネットの仕組み',
              description:
                'インターネットがどのように動くかを学び、開発に必要な基礎力を高めていく。',
              views: '1.2K',
              comments: '6',
              linksrc: '/documents/lists/phase1/internet',
            },
            {
              id: 4,
              imgSrc: 'images/home-imgs/Linux_ホーム画像.png',
              category: 'Phase1',
              title: 'Linux',
              description:
                'Linuxとは何か、そしてLinuxを操作するために必要なコマンドを学んでいく。',
              views: '1.5K',
              comments: '8',
              linksrc: '/documents/lists/phase1/linux',
            },
            {
              id: 5,
              imgSrc: 'images/home-imgs/website_ホーム画像.png',
              category: 'Phase1',
              title: 'Website',
              description:
                'Webサイトを制作する上で必要なHTML/CSSの基礎・実践的な知識を学ぶ',
              views: '1.8K',
              comments: '12',
              linksrc: '/documents/lists/phase1/website',
            },
            {
              id: 6,
              imgSrc: 'images/home-imgs/js基礎_ホーム画像.png',
              category: 'Phase2',
              title: 'JavaScript基礎',
              description:
                'JavaScriptの基礎的な知識をはじめ、基礎構文を学びJavaScriptの基礎力を培う。',
              views: '1.3K',
              comments: '10',
              linksrc: '/documents/lists/phase1/javascript',
            },
            {
              id: 7,
              imgSrc: 'images/home-imgs/js応用_ホーム画像.png',
              category: 'Phase2',
              title: 'JavaScript応用',
              description:
                'JavaScriptを使って様々なアプリを開発していき、実践的に使い方を学んでいく。',
              views: '1.1K',
              comments: '4',
              linksrc: '/documents/lists/phase1/javascript-practice',
            },
            {
              id: 8,
              imgSrc: 'images/home-imgs/php基礎_ホーム画像.png',
              category: 'Phase2',
              title: 'php基礎',
              description:
                'phpの基礎的な知識をはじめ、基礎構文を学びphpの基礎力を培う。',
              views: '1.9K',
              comments: '14',
              linksrc: '/documents/lists/phase1/php',
            },
            {
              id: 9,
              imgSrc: 'images/home-imgs/php応用_ホーム画像.png',
              category: 'Phase2',
              title: 'php実践',
              description:
                'phpを使って様々なアプリを開発していき、実践的に使い方を学んでいく。',
              views: '1.7K',
              comments: '9',
              linksrc: '/documents/lists/phase1/php-practice',
            },
            {
              id: 10,
              imgSrc: 'images/home-imgs/SQL_ホーム画像.png',
              category: 'Phase2',
              title: 'SQL入門',
              description: 'SQLの基礎的な使い方、考え方、書き方を学んでいく。',
              views: '1.7K',
              comments: '9',
              linksrc: '/documents/lists/phase1/sql',
            },
            {
              id: 11,
              imgSrc: 'images/home-imgs/Laravel基礎_ホーム画像.png',
              category: 'Phase3',
              title: 'Laravel基礎',
              description:
                'Laravelの基礎的な知識をはじめ、基礎構文を学びLaravelの基礎力を培う。',
              views: '1.5K',
              comments: '8',
              linksrc: '/documents/lists/phase1/laravel-basic',
            },
            {
              id: 12,
              imgSrc: 'images/home-imgs/Laravel実践_ホーム画像.png',
              category: 'Phase3',
              title: 'Laravel実践',
              description:
                'Laravelを使って様々なアプリを開発していき、実践的に使い方を学んでいく。',
              views: '1.8K',
              comments: '12',
              linksrc: '/documents/lists/phase1/laravel-practice',
            },
            {
              id: 13,
              imgSrc: 'images/home-imgs/React基礎_ホーム画像.png',
              category: 'Phase3',
              title: 'React.js基礎',
              description:
                'React.jsの基礎的な知識をはじめ、基礎構文を学びReact.jsの基礎力を培う。',
              views: '1.3K',
              comments: '10',
              linksrc: '/documents/lists/phase3/react-basic',
            },
            {
              id: 14,
              imgSrc: 'images/home-imgs/React実践_ホーム画像.png',
              category: 'Phase3',
              title: 'React.js実践',
              description:
                'React.jsを使って様々なアプリを開発していき、実践的に使い方を学んでいく。',
              views: '1.1K',
              comments: '4',
              linksrc: '/documents/lists/phase3/react-practice',
            },
            {
              id: 15,
              imgSrc: 'images/home-imgs/ポートフォリオ_ホーム画像.png',
              category: 'Phase4',
              title: 'Aurora Glow',
              description: 'ポートフォリオの作り方、アイデアの探し方を学ぶ。',
              views: '1.9K',
              comments: '14',
              linksrc: '/documents/lists/phase4/portfolio',
            },
            {
              id: 16,
              imgSrc: 'images/home-imgs/就活対策_ホーム画像.png',
              category: 'Phase4',
              title: 'Celestial Journey',
              description:
                '就職・転職活動をしていく上で必要な考え方や対策、履歴書・スキルシートの作り方を学ぶ。',
              views: '1.7K',
              comments: '9',
              linksrc: '/documents/lists/phase4/jobhunting',
            },
          ].map((post) => (
            <div key={post.id} className="p-4 md:w-1/4">
              <div className="h-full border-1  border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="w-full object-cover object-center"
                  src={post.imgSrc}
                  alt={post.title}
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
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      {post.views}
                    </span>
                    {/* コメント数 */}
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      {post.comments}
                    </span>
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
