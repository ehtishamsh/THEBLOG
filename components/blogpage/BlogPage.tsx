"use client";
import React from "react";
import BlogsRecent from "./BlogsRecent";
import DetailBlog from "./DetailBlog";
import { useParams } from "next/navigation";

function BlogPage() {
  const { blogID } = useParams();
  console.log(blogID);
  return (
    <div className="transition-all duration-400 gap-8 grid grid-cols-3">
      <BlogsRecent />
      <DetailBlog />
    </div>
  );
}

export default BlogPage;
