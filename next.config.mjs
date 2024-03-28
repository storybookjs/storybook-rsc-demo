/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  webpack: (config) => {
    if (config.resolve.conditionNames) {
      config.resolve.conditionNames = [
        'storybook',
        ...config.resolve.conditionNames,
      ]
    }
    return config
  },
}

export default nextConfig
