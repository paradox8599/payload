import { postgresAdapter } from '@payloadcms/db-postgres';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';

export const db = (
  process.env.VERCEL ? vercelPostgresAdapter : postgresAdapter
)({
  idType: 'uuid',
  transactionOptions: { isolationLevel: undefined },
  pool: { connectionString: process.env.DATABASE_URI || undefined },
});
