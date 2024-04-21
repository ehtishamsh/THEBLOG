"use client";
import { columns } from "@/app/(user)/(dashboard)/user/blogs/columns";
import { DataTable } from "@/app/(user)/(dashboard)/user/blogs/data-table";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Blogs() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const fetchData = await fetch("/api/user/profile", {
          method: "GET",
        });
        const getData = await fetchData.json();
        setData(getData);
        setLoading(false);
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
    <div className=" mx-auto pb-8 max-w-7xl">
      {loading ? (
        <div className="flex justify-center items-center h-[40vh] max-md:h-[30vh] animate-pulse">
          <Loader2 className="animate-spin h-14 w-14 max-sm:w-full " />
        </div>
      ) : (
        <DataTable columns={columns} data={data?.blogs || []} />
      )}
    </div>
  );
}
