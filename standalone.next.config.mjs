import { withPayload } from '@payloadcms/next/withPayload';
import { nextConfig as appNextConfig } from './next.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...appNextConfig,
  output: 'standalone',
};

export default withPayload(nextConfig);
