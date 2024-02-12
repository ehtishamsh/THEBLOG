import AllBlogs from "@/components/AllBlogSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import RecentBlogs from "@/components/RecentBlogs";
import React from "react";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="max-w-7xl mx-auto mt-8 px-5">
        <RecentBlogs />
        <AllBlogs />
        <Pagination />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
