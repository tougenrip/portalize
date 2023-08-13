/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  transpilePackages: ['gsap', '@readyplayerme/rpm-react-sdk'],
  
}

module.exports = nextConfig,

{
async headers() {
  return [
    {
      source: 'api/(.*)',
      headers: [
        {key:'Access-Control-Cross-Origin',value:`*`},
        {key:"Access-Control-Allow-Credentials",value:"true"},
        {key:'x-api-key',value:process.env.API_ROUTE_SECRET},
        {key: "Access-Control-Allow-Methods",value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"},
        {key: "Access-Control-Allow-Headers",value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"}
          ]
        }
      ]
    }
};
