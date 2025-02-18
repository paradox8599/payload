import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
  return (
    <main>
      <h1>Hi</h1>
      <Link href="/admin">
        <Button>Admin Panel</Button>
      </Link>
    </main>
  );
}
