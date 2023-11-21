/** @type {import('next').NextConfig} */
// const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [ '@readyplayerme/rpm-react-sdk'],
  compress: false,
  transpilePackages: ['three', '@react-three/drei'],
}

// module.exports = nextConfig

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

module.exports = withPWA(nextConfig);
