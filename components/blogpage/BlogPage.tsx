import React from "react";
import DetailBlog from "./DetailBlog";
import RecentBlogData from "../homepage/RecentBlogData";

function BlogPage() {
  return (
    <div className="px-2 py-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-4 gap-8 max-md:grid-cols-1 justify-start items-start">
        <div className="transition-all duration-400 gap-7 flex flex-col justify-start items-start flex-wrap max-md:order-2 max-md:col-span-1">
          <h1 className="text-xl font-semibold mb-4 max-sm:text-lg">
            Recent Blogs
          </h1>
          <RecentBlogData className={`max-h-[200px]`} ammount={8} />
        </div>
        <div className="transition-all duration-400 gap-8 flex flex-col justify-start items-start col-span-3 max-md:col-span-1">
          <DetailBlog />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
