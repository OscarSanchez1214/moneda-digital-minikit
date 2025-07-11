'use client';
import { VerifyBlock } from "@/components/Verify";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-4">
      <h1 className="text-2xl font-bold">MiniApp Moneda Digital</h1>
      <VerifyBlock />
    </main>
  );
}