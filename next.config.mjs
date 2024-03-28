/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    console.log('before', config.resolve.conditionNames);
    if (config.resolve.conditionNames) {
      config.resolve.conditionNames = ['storybook', ...(config.resolve.conditionNames || [])];
    }
    console.log('after', config.resolve.conditionNames);
    return config
  }
}

export default nextConfig;
