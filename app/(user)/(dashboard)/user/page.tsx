"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function page() {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/user") {
    return router.push("/user/profile");
  }
  return null;
}

export default page;
