const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, swcMinify: true,
    experimental: {
        serverActions: true,
      },
      images: {
        domains: ['rzdookoxyvgtmhbobnab.supabase.co'],
      },
 };

module.exports = withContentlayer(nextConfig);
