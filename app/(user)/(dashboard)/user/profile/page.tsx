import GetPath from "@/components/adminPage/GetPath";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  if (session === null) {
    return redirect("/sign-in");
  }
  return (
    <div className="px-5 mt-8">
      <GetPath />
      <div className="px-5 mt-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Hi, Welcome back {session?.user?.username} 👋
        </h1>
        <div className="bg-accent rounded-lg w-fit p-1 mt-6">
          <h1 className="text-base  rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
            Overview
          </h1>
        </div>
        <div className="mt-4"></div>
      </div>
    </div>
  );
}

export default page;
