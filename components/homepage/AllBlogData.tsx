"use client";
import React, { useState } from "react";
import blogData from "../utils/Data";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import GetColor from "../utils/GetColor";

interface data {
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
  tag: { id: number; tagName: string }[];
  id: number;
}
function AllBlogData() {
  const [data, setData] = useState<data[]>(blogData);
  const createElement = data.map((item: data) => {
    return (
      <Link href={`/blog${item.link}`} key={item.id}>
        <img
          src={item.image}
          alt={item.title}
          className="max-h-60 object-cover min-w-full mb-4 transition-all duration-400"
        />

        <p className="transition-all duration-400 text-sm font-semibold text-purple-900 mb-3">
          {item.date}
        </p>
        <div className="transition-all duration-400 flex justify-between items-center mb-3">
          <h3 className="transition-all duration-400 text-base font-semibold max-sm:text-sm  ">
            UX review presentations
          </h3>
          <ArrowTopRightIcon width={16} height={16} />
        </div>
        <p className="transition-all duration-400 text-sm text-gray-400 font-normal mb-6 line-clamp-4">
          {item.description}
        </p>
        <div className="transition-all duration-400 flex items-center gap-3 flex-wrap">
          {item.tag.map((tag) => (
            <GetColor tagName={tag.tagName} key={tag.id} />
          ))}
        </div>
      </Link>
    );
  });
  return <>{createElement}</>;
}

export default AllBlogData;
