import React from "react";
import AllBlogData from "./AllBlogData";

export default function AllBlogSection() {
  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold mb-8 max-sm:text-lg w-full text-start">
        All Blog
      </h1>
      <AllBlogData />
    </div>
  );
}
