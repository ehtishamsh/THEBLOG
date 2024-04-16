"use client";
import EditBlog from "@/components/userPage/blogs/EditBlog";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import React from "react";

function Page() {
  const params = useParams();
  const { data: session } = useSession();
  if (session === null) {
    return redirect("/sign-in");
  }
  return (
    <>
      <EditBlog email={session?.user?.email} id={params.id as string} />
    </>
  );
}

export default Page;
