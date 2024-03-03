import React from "react";
import RecentBlogData from "./RecentBlogData";

function RecentBlogs() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-8 max-sm:text-lg">
        Recent Blogs
      </h1>
      <div className="transition-all duration-400 grid grid-cols-3 grid-rows-2 gap-9 max-md:grid-cols-2 max-sm:grid-cols-1 ">
        <RecentBlogData
          className={"h-[400px] max-lg:h-72 max-sm:h-[220px]"}
          ammount={3}
        />
      </div>
    </div>
  );
}

export default RecentBlogs;
