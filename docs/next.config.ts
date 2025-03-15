import nextra from 'nextra'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false
};

const withNextra = nextra({

})

export default withNextra(nextConfig)
