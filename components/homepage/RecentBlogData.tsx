"use client";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import GetColor from "../utils/GetColor";
import { useParams } from "next/navigation";
import RecentBlogsS from "../skeleton/RecentBlogsS";
import { motion } from "framer-motion";

interface RecentBlogData {
  title: string;
  description: string;
  image: string;
  slug: string;
  tags: string[];
  createdAt: string;
}

function RecentBlogData({
  className,
  ammount,
}: {
  className?: string;
  ammount?: number;
}) {
  const [data, setData] = useState<RecentBlogData[]>([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.get(`/api/user/blogs/recent/${ammount}`);
        const data1 = await data.data;
        if (slug) {
          const filteredData = data1.blogs.filter(
            (item: RecentBlogData) => item.slug !== slug
          );
          setData(filteredData);
        } else {
          setData(data1.blogs);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      setData([]);
    };
  }, []);
  const createBlog = data?.map((item: RecentBlogData, index: number) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        key={index}
        className={`max-md:col-span-1 ${
          index === 0 ? "col-span-2" : index === 1 ? "col-span-1" : "col-span-3"
        }`}
      >
        <Link
          className="transition-all duration-400 "
          href={`/blog/${item.slug}`}
        >
          <img
            src={item.image}
            alt=""
            className={`transition-all duration-400 object-cover border-2 border-border  ${className} min-w-full mb-3 rounded-sm`}
          />
          <h3 className="transition-all duration-400 text-base font-semibold text-purple-900 mb-3">
            {item.createdAt}
          </h3>
          <div className="transition-all duration-400 flex justify-between items-center mb-3">
            <h3 className="transition-all duration-400 text-2xl font-semibold max-sm:text-xl ">
              {item.title}
            </h3>
            <ArrowTopRightIcon width={20} height={20} />
          </div>
          <h4 className="transition-all duration-400 text-base text-gray-400 font-normal mb-6 line-clamp-2">
            {item.description}
          </h4>
          <div className="transition-all duration-400 flex items-center gap-3 flex-wrap">
            {item.tags.map((tag) => (
              <GetColor tagName={tag} key={tag} />
            ))}
          </div>
        </Link>
      </motion.div>
    );
  });
  return (
    <>
      {loading && <RecentBlogsS />}
      {createBlog}
    </>
  );
}

export default RecentBlogData;
