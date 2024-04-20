"use client";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import GetColor from "../utils/GetColor";
import Link from "next/link";
import Loader from "../skeleton/Loader";
import { Loader2 } from "lucide-react";
interface data {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  createdAt: string;
  blogDetail: [{ tag: { tagName: string } }];
}
function SearchBlogs({ search }: { search: string }) {
  const [data, setData] = useState<data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3000/api/user/search/" + search,
        {
          method: "GET",
        }
      );

      const getData = await response.json();
      const blogs = getData.blogs;
      setData(blogs);
      setLoading(false);
    };
    fetchData();
    return () => {
      setData([]);
    };
  }, [search]);
  const createElement =
    data.length > 0 ? (
      data?.map((item: data) => {
        const dateString = item?.createdAt;
        const date = new Date(dateString);

        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
          <Link
            href={`/blog/${item.slug}`}
            key={item.id}
            className="hover:scale-105 transition-all duration-500 max-w-xs max-sm:min-w-full flex justify-between items-start flex-col gap-3"
          >
            <img
              src={item?.image}
              alt={item?.title}
              className="h-52 object-cover min-w-full border border-border rounded-md  transition-all duration-400"
            />

            <p className="transition-all duration-400 text-sm font-semibold text-purple-900">
              {formattedDate}
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
      })
    ) : (
      <p className="text-lg">No blogs found.</p>
    );
  return (
    <div className="flex items-center gap-5 justify-start flex-wrap mt-4">
      {loading ? (
        <div
          className={`transition-all duration-300 bg-background   w-full h-96 max-sm:h-64 flex justify-center items-center`}
        >
          <Loader2 className="animate-spin h-14 w-14" />
        </div>
      ) : (
        createElement
      )}
    </div>
  );
}

export default SearchBlogs;
