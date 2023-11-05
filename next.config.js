/** @type {import('next').NextConfig} */
// const withPlugins = require("next-compose-plugins");
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: true,
// });

const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com']
},
  reactStrictMode: false,
  transpilePackages: [ '@readyplayerme/rpm-react-sdk'],
  compress: false,
  transpilePackages: ['three', '@react-three/drei'],
  typescript: {
    ignoreBuildErrors:true
  }
}

module.exports = nextConfig

// module.exports = withPlugins(
//   [[withPWA, {
//     pwa: {
//       dest: "public",
//       register: true,
//       skipWaiting: true,
//     },
//   }]],
//   nextConfig
// );

// module.exports = withPWA({
//   reactStrictMode: true,
//   transpilePackages: [ '@readyplayerme/rpm-react-sdk'],
//   compress: true,
//   transpilePackages: ['three', '@react-three/drei'],
// });
