const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, swcMinify: true,
    experimental: {
        serverActions: true,
      },
      images: {
        domains: ['https://rzdookoxyvgtmhbobnab.supabase.co'], //todo ここの設定が必要
      },
 };

module.exports = withContentlayer(nextConfig);
