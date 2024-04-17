import { columns } from "@/app/(dashboard)/admin/tags/columns";
import { DataTable } from "@/app/(dashboard)/admin/tags/data-table";
import { Button } from "../ui/button";
import Link from "next/link";
export default async function Tags() {
  const data = await fetch(
    "https://theblogs-ecru.vercel.app/api/admin/tag/get",
    {
      method: "GET",
    }
  );

  const data1 = await data?.json();
  return (
    <div className="mx-auto pb-8 max-w-7xl px-4 max-sm:px-0 w-full">
      <DataTable columns={columns} data={data1.tags} />
    </div>
  );
}
