import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
  return (
    <main className="flex items-center gap-2">
      <h1>Hi</h1>

      <Link href="/admin">
        <Button>Admin Panel</Button>
      </Link>
    </main>
  );
}
