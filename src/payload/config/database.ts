import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { postgresAdapter } from '@payloadcms/db-postgres';

const dbAdapter = process.env.VERCEL ? vercelPostgresAdapter : postgresAdapter;

export const db = dbAdapter({
  idType: 'uuid',
  transactionOptions: { isolationLevel: undefined },
  pool: { connectionString: process.env.DATABASE_URI || undefined },
});
