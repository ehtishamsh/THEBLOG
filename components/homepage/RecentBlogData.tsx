"use client";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import GetColor from "../utils/GetColor";

interface RecentBlogData {
  title: string;
  description: string;
  image: string;
  slug: string;
  tags: string[];
}

function RecentBlogData() {
  const [data, setData] = useState<RecentBlogData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:3000/api/user/blogs");
        const data1 = await data.data;
        setData(data1.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      setData([]);
    };
  }, []);
  const createBlog = data.map((item: RecentBlogData, index: number) => {
    return (
      <div
        key={index}
        className={`${
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
            className="transition-all duration-400 object-cover max-h-[380px] max-lg:max-h-72 max-sm:h-[220px] min-w-full mb-8 rounded-sm"
          />
          <h3 className="transition-all duration-400 text-base font-semibold text-purple-900 mb-3">
            Sunday , 1 Jan 2023
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
      </div>
    );
  });
  return <>{createBlog}</>;
}

export default RecentBlogData;
