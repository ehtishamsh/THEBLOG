import React from "react";

const AllBlogs = () => {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-8 max-sm:text-lg">All Blogs</h1>
      <div className="transition-all duration-400 grid grid-cols-3  gap-8 justify-center items-center max-md:grid-cols-2 max-sm:grid-cols-1"></div>
    </div>
  );
};

export default AllBlogs;
