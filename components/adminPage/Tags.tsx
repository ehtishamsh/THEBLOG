import { columns } from "@/app/(dashboard)/admin/tags/columns";
import { DataTable } from "@/app/(dashboard)/admin/tags/data-table";
import { Button } from "../ui/button";
import Link from "next/link";
export default async function Tags() {
  const data = await fetch("http://localhost:3000/api/admin/tag/get", {
    method: "GET",
  });

  const data1 = await data?.json();
  return (
    <div className="container mx-auto pb-8">
      <DataTable columns={columns} data={data1.tags} />
    </div>
  );
}
