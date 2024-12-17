import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';

export const db = vercelPostgresAdapter({
  idType: 'uuid',
  transactionOptions: { isolationLevel: undefined },
  pool: { connectionString: process.env.DATABASE_URI || undefined },
});
