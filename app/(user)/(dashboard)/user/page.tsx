"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

function Page() {
  const { data: session } = useSession();
  if (session === null) {
    return redirect("/sign-in");
  }
  const pathname = usePathname();
  if (pathname === "/user") {
    return redirect("/user/profile");
  }
}

export default Page;
