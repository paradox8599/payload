import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

export const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: process.env.NODE_ENV === 'production',
  },
};

export default withPayload(nextConfig);
