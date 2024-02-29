import React from "react";
import GetColor from "../utils/GetColor";

interface blog {
  title: string;
  content: string;
  image: string;
  tags: string[];
}
function DetailBlog({ blog }: { blog: any }) {
  console.log(blog);
  return (
    <div className="transition-all duration-400 px-2 flex flex-col justify-start items-start  mt-3">
      <p className="transition-all duration-400 text-base font-semibold mb-8 dark:text-purple-900 text-purple-700 ">
        Sunday , 1 Jan 2023
      </p>
      <h1 className="transition-all duration-400 text-4xl font-bold mb-8">
        {blog.title}
      </h1>
      <img
        src={blog.image}
        alt=""
        className="object-cover w-full max-h-[500px] mb-8"
      />
      <div className="transition-all duration-400 gap-8 flex flex-col justify-start items-start">
        {blog.content}
      </div>
      <div className="mt-8"></div>
    </div>
  );
}

export default DetailBlog;
