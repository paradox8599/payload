import { getPayload } from '@/payload.config';
import { unstable_noStore } from 'next/cache';

export default async function Users() {
  unstable_noStore();
  const payload = await getPayload();
  const users = await payload.count({ collection: 'users' });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <>{users.totalDocs}</>;
}
