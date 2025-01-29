import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

export const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: process.env.NODE_ENV === 'production' ? true : undefined,
  },
  // output: 'standalone',
};

export default withPayload(nextConfig);
