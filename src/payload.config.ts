import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { buildConfig, getPayload as originalGetPayload } from 'payload';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { resendAdapter } from '@payloadcms/email-resend';

import { Users } from './collections/users';
import { Media } from './collections/media';
import { createS3Storage } from './payload/config/s3-storage';
import { payloadInit } from './payload/config/init';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadConfig = buildConfig({
  typescript: { outputFile: path.resolve(dirname, 'payload.d.ts') },
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  editor: lexicalEditor(),
  onInit: payloadInit,

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

  db: (process.env.VERCEL ? vercelPostgresAdapter : postgresAdapter)({
    idType: 'uuid',
    transactionOptions: { isolationLevel: undefined },
    pool: { connectionString: process.env.DATABASE_URI || undefined },
  }),

  email: (!process.env.RESEND_API_KEY ? undefined : resendAdapter)?.({
    apiKey: process.env.RESEND_API_KEY!,
    defaultFromName: process.env.RESEND_DEFAULT_NAME!,
    defaultFromAddress: process.env.RESEND_DEFAULT_FROM_ADDRESS!,
  }),

  plugins: [...createS3Storage()],
});

export async function getPayload() {
  return await originalGetPayload({ config: payloadConfig });
}

export default payloadConfig;
