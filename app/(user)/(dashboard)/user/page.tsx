"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

function Page() {
  const { data: session } = useSession();
  const pathname = usePathname();
  if (session === null) {
    return redirect("/sign-in");
  }
  if (pathname === "/user") {
    return redirect("/user/profile");
  }
}

export default Page;
