"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import GetColor from "../utils/GetColor";

interface data {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  createdAt: string;
  blogDetail: [{ tag: { tagName: string } }];
}
async function AllBlogData() {
  const response = await fetch(
    "https://theblogs-ecru.vercel.app/api/user/blogs",
    {
      cache: "no-store",
    }
  );
  const getData = await response.json();
  const data = getData.data;
  console.log(data[0].blogDetail);
  const createElement = data?.map((item: data) => {
    return (
      <Link
        href={`/blog/${item.slug}`}
        key={item.id}
        className="hover:scale-105 transition-all duration-500 flex justify-between items-start flex-col gap-3"
      >
        <img
          src={item?.image}
          alt={item?.title}
          className="h-52 object-cover min-w-full border border-border rounded-md  transition-all duration-400"
        />

        <p className="transition-all duration-400 text-sm font-semibold text-purple-900">
          {}
        </p>
        <div className="transition-all duration-400 flex justify-between items-center">
          <h3 className="transition-all duration-400 text-base font-semibold max-sm:text-sm  ">
            {item?.title}
          </h3>
          <ArrowTopRightIcon width={16} height={16} />
        </div>
        <p className="transition-all duration-400 text-sm text-gray-400 font-normal line-clamp-3">
          {item?.description}
        </p>
        <div className="transition-all duration-400 flex items-center gap-3 flex-wrap">
          {item?.blogDetail?.map((tag, index) => (
            <GetColor
              tagName={tag.tag.tagName}
              key={tag.tag.tagName + index}
              padding="p-2"
              textSize="text-sm"
            />
          ))}
        </div>
      </Link>
    );
  });
  return <>{createElement}</>;
}

export default AllBlogData;
