import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

function RecentBlogs() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-8 max-sm:text-lg">
        Recent Blogs
      </h1>
      <div className="transition-all duration-400 grid grid-cols-2 gap-9 max-lg:grid-cols-1 ">
        <Link className="transition-all duration-400 " href={"/posts/1"}>
          <img
            src="blog.jpg"
            alt=""
            className="transition-all duration-400 object-cover max-h-[240px] max-lg:max-h-72 max-sm:h-[220px] min-w-full mb-8 rounded-sm"
          />
          <h3 className="transition-all duration-400 text-base font-semibold text-purple-900 mb-3">
            Sunday , 1 Jan 2023
          </h3>
          <div className="transition-all duration-400 flex justify-between items-center mb-3">
            <h3 className="transition-all duration-400 text-2xl font-semibold ">
              UX review presentations
            </h3>
            <ArrowTopRightIcon width={20} height={20} />
          </div>
          <h4 className="transition-all duration-400 text-base text-gray-400 font-normal mb-6">
            How do you create compelling presentations that wow your colleagues
            and impress your managers?
          </h4>
          <div className="transition-all duration-400 flex items-center gap-3 flex-wrap">
            <h6 className="transition-all duration-400 p-2 rounded-3xl bg-red-100 text-red-700 text-sm font-semibold">
              Design
            </h6>
            <h6 className="transition-all duration-400 p-2 rounded-3xl bg-purple-100 text-purple-700 text-sm font-semibold">
              Research
            </h6>
            <h6 className="transition-all duration-400 p-2 rounded-3xl bg-green-100 text-green-700 text-sm font-semibold">
              Presentation
            </h6>
          </div>
        </Link>
        <div className="transition-all duration-400 flex gap-9 flex-col justify-center items-center">
          <Link
            className="transition-all duration-400 flex gap-5 max-md:flex-col"
            href={"/posts/1"}
          >
            <img
              src="blog.jpg"
              alt=""
              className="transition-all duration-400 object-cover max-w-80 max-xl:max-w-64 max-sm:h-[220px] max-lg:max-w-64 max-md:max-w-full rounded-sm"
            />
            <div className="transition-all duration-400 ">
              <h3 className="transition-all duration-400 text-base font-semibold text-purple-900 mb-3">
                Sunday , 1 Jan 2023
              </h3>
              <div className="transition-all duration-400 flex justify-between items-center mb-3">
                <h3 className="transition-all duration-400 text-lg font-semibold ">
                  UX review presentations
                </h3>
                <ArrowTopRightIcon width={20} height={20} />
              </div>
              <h4 className="transition-all duration-400 text-base text-gray-400 font-normal mb-6 line-clamp-3">
                How do you create compelling presentations that wow your
                colleagues and impress your managers?
              </h4>
              <div className="transition-all duration-400 flex items-center gap-3 flex-wrap">
                <h6 className="transition-all duration-400 p-2 rounded-3xl bg-red-100 text-red-700 text-sm font-semibold">
                  Design
                </h6>
                <h6 className="transition-all duration-400 p-2 rounded-3xl bg-purple-100 text-purple-700 text-sm font-semibold">
                  Research
                </h6>
              </div>
            </div>
          </Link>
          <Link
            className="transition-all duration-400 flex gap-5 max-md:flex-col"
            href={"/posts/1"}
          >
            <img
              src="blog.jpg"
              alt=""
              className="transition-all duration-400 object-cover max-w-80 max-xl:max-w-64 max-sm:h-[220px] max-lg:max-w-64 max-md:max-w-full rounded-sm"
            />
            <div className="transition-all duration-400 ">
              <h3 className="transition-all duration-400 text-base font-semibold text-purple-900 mb-3">
                Sunday , 1 Jan 2023
              </h3>
              <div className="transition-all duration-400 flex justify-between items-center mb-3">
                <h3 className="transition-all duration-400 text-lg font-semibold ">
                  UX review presentations
                </h3>
                <ArrowTopRightIcon width={20} height={20} />
              </div>
              <h4 className="transition-all duration-400 text-base text-gray-400 font-normal mb-6 line-clamp-3">
                How do you create compelling presentations that wow your
                colleagues and impress your managers?
              </h4>
              <div className="transition-all duration-400 flex items-center gap-3 flex-wrap">
                <h6 className="transition-all duration-400 px-1 py-2 rounded-3xl bg-red-100 text-red-700 text-sm font-semibold">
                  Design
                </h6>
                <h6 className="transition-all duration-400 px-1 py-2 rounded-3xl bg-purple-100 text-purple-700 text-sm font-semibold">
                  Research
                </h6>
              </div>
            </div>
          </Link>
        </div>
        <Link
          className="transition-all duration-400  flex gap-9 w-full max-lg:flex-col"
          href={"/posts/1"}
        >
          <img
            src="blog.jpg"
            alt=""
            className="transition-all duration-400 object-cover max-h-[240px] max-lg:max-h-72 max-sm:h-[220px] min-w-full mb-8 rounded-sm"
          />
          <div className="transition-all duration-400 min-w-full max-sm:min-w-0">
            <h3 className="transition-all duration-400 text-base font-semibold text-purple-900 mb-3">
              Sunday , 1 Jan 2023
            </h3>
            <div className="transition-all duration-400 flex justify-between items-center  gap-4 mb-3">
              <h3 className="transition-all duration-400 text-2xl font-semibold ">
                UX review presentations
              </h3>
              <ArrowTopRightIcon width={20} height={20} />
            </div>
            <h4 className="transition-all duration-400 text-base text-gray-400 font-normal mb-6">
              How do you create compelling presentations that wow your
              colleagues and impress your managers?
            </h4>
            <div className="transition-all duration-400 flex items-center gap-3 flex-wrap">
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
