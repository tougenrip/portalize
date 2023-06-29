/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  
}

module.exports = nextConfig,
{async rewrites() {
  return [
    {
      source: 'http://192.168.0.33/api/:path*',
      destination: 'http://localhost:3000/api/:path*',
    },
  ]
},
};
