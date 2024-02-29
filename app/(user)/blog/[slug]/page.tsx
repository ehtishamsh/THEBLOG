import BlogPage from "@/components/blogpage/BlogPage";
import React from "react";

async function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = await fetch(`http://localhost:3000/api/user/blogs/${slug}`, {
    method: "GET",
  });
  const blog = await data.json();
  return (
    <>
      <BlogPage blog={blog} />
    </>
  );
}

export default page;
