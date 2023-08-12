/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  transpilePackages: ['gsap', '@readyplayerme/rpm-react-sdk'],
  
}

module.exports = nextConfig,

{
  basePath:'/api',
  async rewrites() {
  return [
    {
      source: 'http://192.168.0.33/api/:path*',
      destination: 'http://localhost:3000/api/:path*',
    },
    {
      source:"https://www.portalize.io/api/:path*",
      destination:"https://portalize.io/api/:path*",
    }
  ]
},
async headers() {
  return [
    {
      source: 'api/*',
      headers: [
        {
          key:'Access-Control-Cross-Origin',
          value:`*`
        },
        {
          key:'x-api-key',
          value:process.env.API_ROUTE_SECRET
        }
      ]
    }
  ]
}
};
