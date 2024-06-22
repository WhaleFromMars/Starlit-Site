"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton } from "./signinbutton";

export function TopNav() {
  const router = useRouter();
  //on sign in, router.refresh() will refresh the page
  return (
    <nav className="flex w-4/5 grid-cols-5 items-center justify-between p-4 text-center font-semibold">
      <Link href="/news">News</Link>

      <Link href="/store">Store</Link>

      <Link href="/" className="text-5xl">
        StarlitMC
      </Link>

      <Link href="/vote">Vote</Link>

      <SignInButton />
    </nav>
  );
}
