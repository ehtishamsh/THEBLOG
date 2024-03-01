import BlogPage from "@/components/blogpage/BlogPage";
import React from "react";

async function page({ params }: { params: { slug: string } }) {
  return (
    <>
      <BlogPage params={params.slug} />
    </>
  );
}

export default page;
