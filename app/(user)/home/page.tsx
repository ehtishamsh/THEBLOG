import AllBlogSection from "@/components/homepage/AllBlogSection";
import HeroSection from "@/components/homepage/HeroSection";
import Pagination from "@/components/homepage/Pagination";
import RecentBlogs from "@/components/homepage/RecentBlogs";
import React from "react";

function page() {
  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto mt-8 px-5">
        <RecentBlogs />
        <AllBlogSection />
        <Pagination />
      </div>
    </>
  );
}

export default page;
