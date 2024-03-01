import React from "react";
import BlogsRecent from "./BlogsRecent";
import DetailBlog from "./DetailBlog";

function BlogPage({ params }: { params: string }) {
  return (
    <div className="px-2 py-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-4 gap-3 max-md:grid-cols-1 justify-start items-start">
        <div className="transition-all duration-400 gap-7 flex flex-col justify-start items-start flex-wrap max-md:order-2 max-md:col-span-1">
          <BlogsRecent />
        </div>
        <div className="transition-all duration-400 gap-8 flex flex-col justify-start items-start col-span-3 max-md:col-span-1">
          <DetailBlog params={params} />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
