"use client";
import React, { useEffect, useState } from "react";
import GetColor from "../utils/GetColor";
import GetContent from "./GetContent";
import { toast } from "../ui/use-toast";

interface blog {
  title: string;
  content: string;
  image: string;
  tags: string[];
}
function DetailBlog({ params }: { params: string }) {
  const [blog, setBlogs] = useState<blog>({} as blog);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = params;
        const data = await fetch(
          `http://localhost:3000/api/user/blogs/${slug}`,
          {
            method: "GET",
          }
        );
        const blog = await data.json();
        setBlogs(blog.formatedBlog);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Something went wrong.",
          variant: "destructive",
        });
      }
    };
    fetchData();
    return () => {
      setBlogs({} as blog);
    };
  }, []);
  return (
    <>
      <div className="transition-all duration-400 px-2 flex flex-col justify-start items-start  mt-3">
        <p className="transition-all duration-400 text-base font-semibold mb-8 dark:text-purple-900 text-purple-700 ">
          Sunday , 1 Jan 2023
        </p>
        <h1 className="transition-all duration-400 text-4xl font-bold mb-8">
          {blog?.title}
        </h1>
        <img
          src={blog?.image}
          alt={blog?.title}
          className="object-cover w-full max-h-[500px] mb-8"
        />
        <div className="transition-all duration-400 gap-8 flex flex-col justify-start items-start">
          <GetContent content={blog?.content} />
        </div>
        <div className="mt-8 flex gap-3">
          {blog?.tags?.map((tag: string, index: number) => (
            <GetColor tagName={tag} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default DetailBlog;
