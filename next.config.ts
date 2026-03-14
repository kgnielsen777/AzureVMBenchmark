/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/AzureVMBenchmark' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/AzureVMBenchmark/' : '',
  trailingSlash: true,
}

export default nextConfig
