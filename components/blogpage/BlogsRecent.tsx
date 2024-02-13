import React from "react";
import AllBlogData from "../homepage/AllBlogData";

function BlogsRecent() {
  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold mb-8 max-sm:text-lg w-full text-start">
        Recent Blogs
      </h1>
      <div className="grid grid-cols-3 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
        <AllBlogData />
      </div>
    </div>
  );
}

export default BlogsRecent;
