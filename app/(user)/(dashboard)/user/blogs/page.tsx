"use client";
import GetPath from "@/components/adminPage/GetPath";
import Tags from "@/components/adminPage/Tags";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Blogs from "@/components/userPage/blogs/Blogs";
import GetColor from "@/components/utils/GetColor";
import { Edit, Plus, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="px-2 max-w-6xl">
      <div className="mt-8 px-5 flex flex-col gap-5 w-full">
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
        <Blogs />
        <DropdownMenuSeparator />
      </div>
    </div>
  );
}

export default page;
