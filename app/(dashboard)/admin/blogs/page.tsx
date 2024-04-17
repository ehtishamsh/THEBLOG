import GetPath from "@/components/adminPage/GetPath";

import ManageBlogs from "@/components/adminPage/blogs/ManageBlogs";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { authOptions } from "@/lib/auth";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

function Page() {
  const session = getServerSession(authOptions);
  if (session === null) {
    return redirect("/sign-in");
  }
  return (
    <div className="px-2 max-w-6xl">
      <div className="mt-8 px-5 max-sm:px-0 flex flex-col gap-5 w-full">
        <GetPath />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
            <span className="text-sm text-muted-foreground">
              Manage your blogs
            </span>
          </div>
          <Link
            href={"/create"}
            className="flex items-center gap-5 bg-foreground text-black border-placeholder-default border px-3 py-2 rounded-lg"
          >
            <Plus width={20} height={20} /> Add New
          </Link>
        </div>
        <DropdownMenuSeparator />
        <ManageBlogs />
        <DropdownMenuSeparator />
      </div>
    </div>
  );
}

export default Page;
