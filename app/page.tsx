import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={'/products'} className="text-center bg-orange-600 py-3 px-3 rounded text-white">View Products</Link>
    </main>
  );
}
