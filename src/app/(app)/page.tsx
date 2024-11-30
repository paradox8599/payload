import { Suspense } from 'react';
import Users from './users';

export default async function Page() {
  return (
    <main>
      <span>payload: </span>
      <Suspense fallback="???">
        <Users />
      </Suspense>
      <span> users</span>
    </main>
  );
}
