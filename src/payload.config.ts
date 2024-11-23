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
import { resendAdapter } from '@payloadcms/email-resend';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

if (process.env.NODE_ENV === 'development') {
  console.log('Environment:', {
    PAYLOAD_VERCEL: process.env.PAYLOAD_VERCEL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    DATABASE_URI: process.env.DATABASE_URI,

    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,

    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_DEFAULT_NAME: process.env.RESEND_DEFAULT_NAME,
    RESEND_DEFAULT_FROM_ADDRESS: process.env.RESEND_DEFAULT_FROM_ADDRESS,
  });
}

const payloadConfig = buildConfig({
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  editor: lexicalEditor(),
  typescript: { outputFile: path.resolve(dirname, 'payload.d.ts') },

  collections: [Users, Media],

  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'admin@me.com',
            password: 'admin@me.com',
            username: 'admin@me.com',
            prefillOnly: true,
          }
        : undefined,
  },

  db:
    process.env.PAYLOAD_VERCEL === 'true'
      ? vercelPostgresAdapter()
      : postgresAdapter({
          pool: {
            connectionString: process.env.DATABASE_URI!,
            ssl: process.env.DATABASE_URI!.includes('sslmode=require'),
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

  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY!,
    defaultFromName: process.env.RESEND_DEFAULT_NAME!,
    defaultFromAddress: process.env.RESEND_DEFAULT_FROM_ADDRESS!,
  }),
});

export async function getPayload() {
  const payload = await originalGetPayload({ config: payloadConfig });
  return payload;
}

export default payloadConfig;
