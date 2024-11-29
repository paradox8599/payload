import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';
import { nextConfig as appNextConfig } from './next.config';

const nextConfig: NextConfig = {
  ...appNextConfig,
  output: 'standalone',
};

export default withPayload(nextConfig);
