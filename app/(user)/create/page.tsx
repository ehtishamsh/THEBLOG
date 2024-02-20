import CreatePost from "@/components/createpostPage/CreatePost";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return redirect("api/auth/signin");
  } else {
    return (
      <div className="relative">
        <CreatePost />
      </div>
    );
  }
}

export default page;
