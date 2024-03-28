/** @type {import('next').NextConfig} */
const nextConfig = {
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
