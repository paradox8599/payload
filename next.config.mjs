import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // uncomment for docker to build standalone version
  // output: 'standalone',
};

export default withPayload(nextConfig);
