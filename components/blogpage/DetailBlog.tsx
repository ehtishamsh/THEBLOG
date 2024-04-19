"use client";
import React, { useEffect, useState } from "react";
import GetColor from "../utils/GetColor";
import GetContent from "./GetContent";
import { toast } from "../ui/use-toast";
import { redirect, useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import DetailBlogS from "../skeleton/DetailBlogS";
import Image from "next/image";
import ShareButtons from "./ShareButtons";
type blog = {
  title: string;
  content: string;
  image: string;
  createdAt: string;
  tags: string[];
  user: {
    username: string;
    image: string;
  };
  blog?: null;
} | null;
function DetailBlog() {
  const { slug } = useParams();
  const [blog, setBlogs] = useState<blog>({} as blog);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog?.blog === null) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
      redirect("/home");
    }
  }, [blog]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.get(`/api/user/blogs/single/${slug}`);
        const blog = await data.data;
        setBlogs(blog?.formatedBlog || blog);
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
          className="transition-all duration-400 px-2 flex flex-col justify-start items-start w-full mt-3"
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
                width={50}
                height={50}
                src={blog?.user?.image as string}
                alt={blog?.user?.username as string}
                className="rounded-full border border-border w-[50px] h-[50px] object-cover"
              />
              <p className="transition-all duration-400 text-base text-muted-foreground font-semibold ml-3 uppercase">
                @{blog?.user?.username}
              </p>
            </div>
          </div>
          <img
            src={blog?.image}
            alt={blog?.title}
            className="object-cover w-full max-h-[500px] mb-8 transition-all duration-400 border border-border rounded-md"
          />
          <div className="transition-all duration-400  grid grid-cols-1 overflow-hidden">
            <GetContent content={blog?.content as string} />
          </div>
          <p className="text-xl mt-4 font-semibold">Tags:</p>
          <div className="transition-all duration-400 flex flex-col justify-start items-start">
            <div className="mt-3 flex gap-3 flex-wrap  transition-all duration-400">
              {blog?.tags?.map((tag: string, index: number) => (
                <GetColor
                  tagName={tag}
                  key={index}
                  padding="px-4 py-2"
                  textSize="text-sm"
                />
              ))}
            </div>
            <ShareButtons />
          </div>
        </motion.div>
      )}
    </>
  );
}

export default DetailBlog;
