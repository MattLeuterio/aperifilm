/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['lh3.googleusercontent.com', 's.gravatar.com'],
  }
}

module.exports = nextConfig
