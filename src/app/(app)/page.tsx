import { getPayload } from '@/payload.config';

export default async function Page() {
  const payload = await getPayload();
  const users = await payload.count({ collection: 'users' });
  return <main>payload: {users.totalDocs} users</main>;
}
