import Link from "next/link";

export default async function HomePage() {
  return (
    <main>
      <h1>Hi</h1>
      <Link href="/admin">admin</Link>
    </main>
  );
}
