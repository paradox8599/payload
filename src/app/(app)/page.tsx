import { Suspense } from 'react';
import { getPayload } from '@/payload.config';
import { unstable_noStore } from 'next/cache';

async function Users() {
  unstable_noStore();
  const payload = await getPayload();
  const users = await payload.count({ collection: 'users' });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <>{users.totalDocs}</>;
}

export default async function Page() {
  return (
    <main className="p-4">
      <section className="shadow p-4">
        <span className="font-bold">payload: </span>
        <Suspense fallback="???">
          <Users />
        </Suspense>
        <span> users</span>
      </section>
    </main>
  );
}
