import React from "react";
import AllBlogData from "./AllBlogData";
import Pagination from "./Pagination";
import { db } from "@/lib/db";

export default async function AllBlogSection({ page }: { page: number }) {
  const primsa = await db?.blog.findMany();
  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold mb-8 max-sm:text-lg w-full text-start">
        All Blog
      </h1>

      <div className="transition-all duration-400 grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 gap-8">
        <AllBlogData page={page} />
      </div>
      <Pagination length={primsa.length} current={Number(page)} />
    </div>
  );
}
