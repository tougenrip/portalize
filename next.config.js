/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ '@readyplayerme/rpm-react-sdk'],
  
}

module.exports = nextConfig,{
async headers() {
  return [
    {
      source: 'api/(.*)',
      headers: [
        {key:'Access-Control-Cross-Origin',value:`*`},
        {key:"Access-Control-Allow-Credentials",value:"true"},
          ]
        }
      ]
    }
};
