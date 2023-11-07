/** @type {import('next').NextConfig} */
// const withPlugins = require("next-compose-plugins");
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: true,
// });

const nextConfig = {
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '5mb',
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'localhost'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
    ],
},
  reactStrictMode: true,
  transpilePackages: [ '@readyplayerme/rpm-react-sdk'],
  compress: false,
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

// module.exports = withPWA({
//   reactStrictMode: true,
//   transpilePackages: [ '@readyplayerme/rpm-react-sdk'],
//   compress: true,
//   transpilePackages: ['three', '@react-three/drei'],
// });
