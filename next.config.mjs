/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ipfs.io'
            },
            {
                protocol: 'https',
                hostname: 'd9emswcmuvawb.cloudfront.net'
            },
            {
                protocol: 'https',
                hostname: 'bafybeifrjmhpuf34cv6sy4lqhs5gmmusznpunyfik3rqoqfi73abpcpnbi.ipfs.w3s.link'
            }
        ]
    }
};

export default nextConfig;
