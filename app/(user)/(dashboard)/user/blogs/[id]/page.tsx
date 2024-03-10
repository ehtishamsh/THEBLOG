"use client";
import EditBlog from "@/components/userPage/blogs/EditBlog";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";

function page() {
  const params = useParams();
  const { data: session } = useSession();
  return (
    <div className="max-w-6xl mr-auto">
      <EditBlog email={session?.user?.email} id={params.id as string} />
    </div>
  );
}

export default page;
