import { columns } from "@/app/(dashboard)/admin/blogs/columns";
import { DataTable } from "@/app/(dashboard)/admin/blogs/data-table";
import React, { useEffect, useState } from "react";

export default async function ManageBlogs() {
  const fetchData = await fetch("http://localhost:3000/api/admin/blogs", {
    method: "GET",
  });
  const getData = await fetchData.json();
  return (
    <div className=" mx-auto pb-8 max-w-7xl">
      <DataTable columns={columns} data={getData?.blogs || []} />
    </div>
  );
}
