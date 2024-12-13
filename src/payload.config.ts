import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { buildConfig, getPayload as originalGetPayload } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import { Users } from './payload/collections/users';
import { Media } from './payload/collections/media';
import { createS3Storage } from './payload/config/s3-storage';
import { payloadInit } from './payload/config/init';
import { email } from '@/payload/config/email';
import { db } from './payload/config/database';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadConfig = buildConfig({
  typescript: { outputFile: path.resolve(dirname, 'payload.d.ts') },
  secret: process.env.PAYLOAD_SECRET || '',
  onInit: payloadInit,

  editor: lexicalEditor(),
  email,
  db,
  sharp,
  plugins: [...createS3Storage()],

  collections: [Users, Media],

  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    autoLogin:
      process.env.NODE_ENV !== 'development'
        ? undefined
        : {
          email: 'admin@me.com',
          password: 'admin@me.com',
          username: 'admin@me.com',
          prefillOnly: true,
        },
  },
});

export async function getPayload() {
  return await originalGetPayload({ config: payloadConfig });
}

export default payloadConfig;
