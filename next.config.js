const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['rzdookoxyvgtmhbobnab.supabase.co'], //todo ここの設定が必要
  },
  webpack: (config, { isServer }) => {
    // Supabase関連のオプショナル依存関係の警告を抑制
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bufferutil: false,
        'utf-8-validate': false,
      };
    }

    // wsモジュールの警告を抑制
    config.externals = config.externals || [];
    config.externals.push({
      bufferutil: 'bufferutil',
      'utf-8-validate': 'utf-8-validate',
    });

    return config;
  },
  async redirects() {
    return [
      // 教材一覧のリダイレクト
      {
        source: '/material-lists',
        destination: '/courses',
        permanent: true,
      },
      // 各教材のリダイレクト
      {
        source: '/material1',
        destination: '/courses/php-todo/lessons',
        permanent: true,
      },
      {
        source: '/material2',
        destination: '/courses/php-memo/lessons',
        permanent: true,
      },
      {
        source: '/material3',
        destination: '/courses/js-basic/lessons',
        permanent: true,
      },
      {
        source: '/material4',
        destination: '/courses/php-basic/lessons',
        permanent: true,
      },
      {
        source: '/material5',
        destination: '/courses/nextjs-basic/lessons',
        permanent: true,
      },
      {
        source: '/material6',
        destination: '/courses/github/lessons',
        permanent: true,
      },
      {
        source: '/material7',
        destination: '/courses/internet/lessons',
        permanent: true,
      },
      {
        source: '/material8',
        destination: '/courses/linux/lessons',
        permanent: true,
      },
      {
        source: '/material9',
        destination: '/courses/website/lessons',
        permanent: true,
      },
      {
        source: '/material10',
        destination: '/courses/js-advanced/lessons',
        permanent: true,
      },
      {
        source: '/material11',
        destination: '/courses/php-advanced/lessons',
        permanent: true,
      },
      {
        source: '/material12',
        destination: '/courses/sql/lessons',
        permanent: true,
      },
      {
        source: '/material13',
        destination: '/courses/laravel/lessons',
        permanent: true,
      },
      {
        source: '/material14',
        destination: '/courses/laravel-advanced/lessons',
        permanent: true,
      },
      {
        source: '/material15',
        destination: '/courses/react/lessons',
        permanent: true,
      },
      {
        source: '/material16',
        destination: '/courses/react-advanced/lessons',
        permanent: true,
      },
      {
        source: '/material17',
        destination: '/courses/portfolio/lessons',
        permanent: true,
      },
      {
        source: '/material18',
        destination: '/courses/career/lessons',
        permanent: true,
      },
      // 個別記事のリダイレクト
      {
        source: '/post/:course/:lesson*',
        destination: '/courses/:course/lessons/:lesson*',
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
