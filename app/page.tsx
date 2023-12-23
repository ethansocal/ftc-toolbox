"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {status == "authenticated" ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}

      <div>
        {status == "authenticated" ? (
          <text>Logged in as: {session.user?.name}</text>
        ) : (
          <text>not logged in</text>
        )}
      </div>
    </main>
  );
}
