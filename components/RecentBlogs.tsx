import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

function RecentBlogs() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-8 max-sm:text-lg">
        Recent Blogs
      </h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-9 max-md:grid-cols-1">
        <Link className="row-span-2" href={"/posts/1"}>
          <img
            src="blog.jpg"
            alt=""
            className="object-cover max-h-[240px] min-w-full mb-8 rounded-sm"
          />
          <h3 className="text-base font-semibold text-purple-900 mb-3">
            Sunday , 1 Jan 2023
          </h3>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold mb-3 ">
              UX review presentations
            </h3>
            <ArrowTopRightIcon width={20} height={20} />
          </div>
          <h4 className="text-base text-gray-400 font-normal mb-6">
            How do you create compelling presentations that wow your colleagues
            and impress your managers?
          </h4>
          <div className="flex items-center gap-3">
            <h6 className="p-2 rounded-3xl bg-red-100 text-red-700 text-sm font-semibold">
              Design
            </h6>
            <h6 className="p-2 rounded-3xl bg-purple-100 text-purple-700 text-sm font-semibold">
              Research
            </h6>
            <h6 className="p-2 rounded-3xl bg-green-100 text-green-700 text-sm font-semibold">
              Presentation
            </h6>
          </div>
        </Link>
        <Link className="flex gap-5" href={"/posts/1"}>
          <img
            src="blog.jpg"
            alt=""
            className="object-contain max-w-80 max-h-52   mb-8 rounded-sm"
          />
          <div className="">
            <h3 className="text-base font-semibold text-purple-900 mb-3">
              Sunday , 1 Jan 2023
            </h3>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-3 ">
                UX review presentations
              </h3>
              <ArrowTopRightIcon width={20} height={20} />
            </div>
            <h4 className="text-base text-gray-400 font-normal mb-6 line-clamp-3">
              How do you create compelling presentations that wow your
              colleagues and impress your managers?
            </h4>
            <div className="flex items-center gap-3">
              <h6 className="p-2 rounded-3xl bg-red-100 text-red-700 text-sm font-semibold">
                Design
              </h6>
              <h6 className="p-2 rounded-3xl bg-purple-100 text-purple-700 text-sm font-semibold">
                Research
              </h6>
              <h6 className="p-2 rounded-3xl bg-green-100 text-green-700 text-sm font-semibold">
                Presentation
              </h6>
            </div>
          </div>
        </Link>
        <Link className="flex gap-5" href={"/posts/1"}>
          <img
            src="blog.jpg"
            alt=""
            className="object-contain max-w-80 max-h-52   mb-8 rounded-sm"
          />
          <div className="">
            <h3 className="text-base font-semibold text-purple-900 mb-3">
              Sunday , 1 Jan 2023
            </h3>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-3 ">
                UX review presentations
              </h3>
              <ArrowTopRightIcon width={20} height={20} />
            </div>
            <h4 className="text-base text-gray-400 font-normal mb-6 line-clamp-3">
              How do you create compelling presentations that wow your
              colleagues and impress your managers?
            </h4>
            <div className="flex items-center gap-3">
              <h6 className="p-2 rounded-3xl bg-red-100 text-red-700 text-sm font-semibold">
                Design
              </h6>
              <h6 className="p-2 rounded-3xl bg-purple-100 text-purple-700 text-sm font-semibold">
                Research
              </h6>
              <h6 className="p-2 rounded-3xl bg-green-100 text-green-700 text-sm font-semibold">
                Presentation
              </h6>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default RecentBlogs;
