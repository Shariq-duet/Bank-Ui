/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root: an unrelated lockfile sits in the parent directory.
  outputFileTracingRoot: process.cwd(),
}

export default nextConfig
