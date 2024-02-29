import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import GetColor from "../utils/GetColor";

interface RecentBlogData {
  title: string;
  description: string;
  image: string;
  slug: string;
  tags: string[];
}
async function RecentBlogData() {
  const data = await fetch("http://localhost:3000/api/user/blogs/", {
    method: "GET",
  });
  const data1 = await data.json();
  console.log(data1);
  const createBlog = data1.blogs.map((item: RecentBlogData, index: number) => {
    return (
      <div key={index}>
        <Link
          className="transition-all duration-400 "
          href={`/blog/${item.slug}`}
        >
          <img
            src={item.image}
            alt=""
            className="transition-all duration-400 object-cover max-h-[240px] max-lg:max-h-72 max-sm:h-[220px] min-w-full mb-8 rounded-sm"
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
