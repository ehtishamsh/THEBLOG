import React from "react";
import BlogsRecent from "./BlogsRecent";
import DetailBlog from "./DetailBlog";

async function BlogPage({ blog }: { blog: any }) {
  return (
    <div className="px-2 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="transition-all duration-400 gap-8 grid grid-cols-1 grid-rows-2">
          <DetailBlog blog={blog} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <BlogsRecent />
      </div>
    </div>
  );
}

export default BlogPage;
