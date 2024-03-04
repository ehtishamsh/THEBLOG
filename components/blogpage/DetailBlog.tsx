"use client";
import React, { useEffect, useState } from "react";
import GetColor from "../utils/GetColor";
import GetContent from "./GetContent";
import { toast } from "../ui/use-toast";
import { useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import DetailBlogS from "../skeleton/DetailBlogS";
import Image from "next/image";
interface blog {
  title: string;
  content: string;
  image: string;
  createdAt: string;
  tags: string[];
  user: {
    username: string;
    image: string;
  };
}
function DetailBlog() {
  const { slug } = useParams();
  const [blog, setBlogs] = useState<blog>({} as blog);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.get(`/api/user/blogs/single/${slug}`);
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
            {blog?.createdAt}
          </p>

          <h1 className="transition-all duration-400 text-4xl font-bold mb-8">
            {blog?.title}
          </h1>
          <div className="transition-all duration-400 flex flex-col gap-3 mb-4 justify-start items-center">
            <div className="flex justify-start items-center">
              <Image
                width={65}
                height={65}
                src={blog?.user?.image}
                alt={blog?.user?.username}
                className="rounded-full border border-border w-[65px] h-[65px]"
              />
              <p className="transition-all duration-400 text-base text-muted-foreground font-semibold ml-3 uppercase">
                {blog?.user?.username}
              </p>
            </div>
          </div>
          <img
            src={blog?.image}
            alt={blog?.title}
            className="object-cover w-full max-h-[500px] mb-8 transition-all duration-400 border border-border rounded-md"
          />
          <div className="transition-all duration-400  grid grid-cols-1 overflow-hidden">
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
