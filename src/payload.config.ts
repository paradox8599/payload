import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { buildConfig, getPayload as originalGetPayload } from 'payload';

import { s3Storage } from '@payloadcms/storage-s3';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadConfig = buildConfig({
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  editor: lexicalEditor(),
  typescript: { outputFile: path.resolve(dirname, 'payload.d.ts') },

  collections: [Users, Media],

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  db:
    process.env.PAYLOAD_VERCEL === 'true'
      ? vercelPostgresAdapter({
        pool: { connectionString: process.env.DATABASE_URI! },
      })
      : postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI!,
          ssl: false,
        },
      }),

  plugins: [
    s3Storage({
      bucket: process.env.S3_BUCKET!,
      config: {
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT!,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
      },
      collections: {
        media: { prefix: 'media/', disableLocalStorage: true },
      },
      disableLocalStorage: true,
    }),
  ],
});

export async function getPayload() {
  const payload = await originalGetPayload({ config: payloadConfig });
  return payload;
}

export default payloadConfig;
