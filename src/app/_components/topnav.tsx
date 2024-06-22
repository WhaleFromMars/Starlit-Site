"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton } from "./signinbutton";

export function TopNav() {
  const router = useRouter();
  //on sign in, router.refresh() will refresh the page
  return (
    <nav className="mx-auto flex w-full max-w-screen-xl items-center justify-between p-4 text-center font-semibold">
      <Link href="/news" className="px-4">
        News
      </Link>

      <Link href="/store" className="px-4">
        Store
      </Link>

      <Link href="/" className="px-4 text-5xl">
        StarlitMC
      </Link>

      <Link href="/vote" className="px-4">
        Vote
      </Link>

      <SignInButton />
    </nav>
  );
}
