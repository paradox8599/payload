import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
export const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
};

export default withPayload(nextConfig);
