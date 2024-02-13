"use client";
import React from "react";
import BlogsRecent from "./BlogsRecent";
import DetailBlog from "./DetailBlog";
import { useParams } from "next/navigation";

function BlogPage() {
  const { blogID } = useParams();
  console.log(blogID);
  return (
    <div className="px-2 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="transition-all duration-400 gap-8 grid grid-cols-1 grid-rows-2">
          <DetailBlog />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <BlogsRecent />
      </div>
    </div>
  );
}

export default BlogPage;
