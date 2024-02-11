import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import RecentBlogs from "@/components/RecentBlogs";
import React from "react";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="max-w-7xl mx-auto mt-8 px-5">
        <RecentBlogs />
      </div>
    </>
  );
}

export default HomePage;
