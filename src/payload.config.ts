import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig, getPayload as originalGetPayload } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Media } from './payload/collections/media';
import { Users } from './payload/collections/users';
import { db } from './payload/config/database';
import { email } from './payload/config/email';
import { payloadInit } from './payload/config/init';
import { createS3Storage } from './payload/config/storage';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadConfig = buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'f9f43f5611aabaf0d48e1cf5',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  onInit: payloadInit,

  globals: [],
  collections: [Users, Media],

  editor: lexicalEditor(),
  email,
  db,
  sharp,
  plugins: [...createS3Storage()],

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // cors: [],
  // debug: process.env.NODE_ENV !== 'production',
  debug: true,
});

export async function getPayload() {
  return await originalGetPayload({ config: payloadConfig });
}

export default payloadConfig;
