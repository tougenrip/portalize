/** @type {import('next').NextConfig} */
// const withPlugins = require("next-compose-plugins");
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development",
// });

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [ '@readyplayerme/rpm-react-sdk'],
  compress: true,
  transpilePackages: ['three', '@react-three/drei'],
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

// module.exports = withPWA(nextConfig);
