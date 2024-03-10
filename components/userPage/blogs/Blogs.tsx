"use client";
import { columns } from "@/app/(user)/(dashboard)/user/blogs/columns";
import { DataTable } from "@/app/(user)/(dashboard)/user/blogs/data-table";
import React, { useEffect, useState } from "react";

export default function Blogs() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchData = await fetch("/api/user/profile", {
          method: "GET",
        });
        const getData = await fetchData.json();
        setData(getData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
    return () => {
      setData({});
    };
  }, []);

  return (
    <div className="container mx-auto pb-8">
      <DataTable columns={columns} data={data?.blogs || []} />
    </div>
  );
}
