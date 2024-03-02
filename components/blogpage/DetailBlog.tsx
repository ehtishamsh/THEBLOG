"use client";
import React, { useEffect, useState } from "react";
import GetColor from "../utils/GetColor";
import GetContent from "./GetContent";
import { toast } from "../ui/use-toast";
import { useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import DetailBlogS from "../skeleton/DetailBlogS";
interface blog {
  title: string;
  content: string;
  image: string;
  tags: string[];
}
function DetailBlog() {
  const { slug } = useParams();
  const [blog, setBlogs] = useState<blog>({} as blog);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3000/api/user/blogs/single/${slug}`
        );
        const blog = await data.data;
        setBlogs(blog.formatedBlog);
        setLoading(false);
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
      {loading ? (
        <DetailBlogS />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="transition-all duration-400 px-2 flex flex-col justify-start items-start  mt-3"
        >
          <p className="transition-all duration-400 text-base font-semibold mb-8 dark:text-purple-900 text-purple-700 ">
            Sunday , 1 Jan 2023
          </p>
          <h1 className="transition-all duration-400 text-4xl font-bold mb-8">
            {blog?.title}
          </h1>
          <img
            src={blog?.image}
            alt={blog?.title}
            className="object-cover w-full max-h-[500px] mb-8 transition-all duration-400"
          />
          <div className="transition-all duration-400 gap-8 flex flex-col justify-start items-start">
            <GetContent content={blog?.content} />
          </div>
          <div className="mt-8 flex gap-3 flex-wrap transition-all duration-400">
            {blog?.tags?.map((tag: string, index: number) => (
              <GetColor tagName={tag} key={index} />
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

export default DetailBlog;
