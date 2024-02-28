import CreatePost from "@/components/createpostPage/CreatePost";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session === null) {
    return redirect("/sign-in");
  } else {
    return (
      <div className="relative">
        <CreatePost email={session?.user?.email} />
      </div>
    );
  }
}

export default page;
