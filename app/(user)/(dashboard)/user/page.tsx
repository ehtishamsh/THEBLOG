"use client";
import { redirect, usePathname } from "next/navigation";

function Page() {
  const pathname = usePathname();
  if (pathname === "/user") {
    return redirect("/user/profile");
  }
}

export default Page;
