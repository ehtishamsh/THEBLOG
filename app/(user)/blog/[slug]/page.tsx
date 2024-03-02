import BlogPage from "@/components/blogpage/BlogPage";
import React from "react";

async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await fetch(
    `https://theblogs-ecru.vercel.app/api/user/blogs/${slug}`,
    {
      method: "GET",
    }
  );
  const blog = await data.json();

  return (
    <>
      <BlogPage blog={blog.formatedBlog} />
    </>
  );
}

export default page;
