import React from "react";
import RecentBlogData from "./RecentBlogData";

const RecentBlogs: React.FC = () => {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-8 max-sm:text-lg">
        Recent Blogs
      </h1>
      <div className="transition-all duration-400 grid grid-cols-3 grid-rows-2 gap-9 max-lg:grid-cols-1 ">
        <RecentBlogData />
      </div>
    </div>
  );
};

export default RecentBlogs;
