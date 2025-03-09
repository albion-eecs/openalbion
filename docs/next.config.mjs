import nextra from 'nextra'

/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    poweredByHeader: false
};

const withNextra = nextra({

})

export default withNextra(nextConfig)
