/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/landing-page' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/landing-page' : '',
}

module.exports = nextConfig