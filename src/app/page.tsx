'use client'
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { toast } from "react-toastify";

export default function Home() {
  const { data: session } = useSession();
  
  return (
    <main className="">
      <div>
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={() => toast.success("teste",{
          position:"top-right"
        })}>Toast</button>
      </div>
    </main>
  );
}
