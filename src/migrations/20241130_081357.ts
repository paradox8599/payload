import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" ADD COLUMN "uuid" varchar;
  CREATE UNIQUE INDEX IF NOT EXISTS "users_uuid_idx" ON "users" USING btree ("uuid");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP INDEX IF EXISTS "users_uuid_idx";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "uuid";`)
}
