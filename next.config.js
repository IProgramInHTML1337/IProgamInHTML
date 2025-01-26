/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.gravatar.com', 'cdn.nekos.life']
  }
}

module.exports = nextConfig
