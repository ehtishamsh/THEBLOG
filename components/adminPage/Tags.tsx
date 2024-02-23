import { columns } from "@/app/(dashboard)/admin/tags/columns";
import { DataTable } from "@/app/(dashboard)/admin/tags/data-table";
import { Button } from "../ui/button";
import Link from "next/link";
import { GETPOST } from "@/app/api/admin/tag/get/route";

export default async function Tags() {
  const data = await GETPOST();
  const tags = data?.data;

  return (
    <div className="container mx-auto pb-8">
      <DataTable columns={columns} data={tags} />
    </div>
  );
}
