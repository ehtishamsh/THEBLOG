import { columns } from "@/app/(dashboard)/admin/users/columns";
import { DataTable } from "@/app/(dashboard)/admin/users/data-table";

export default async function UserTags() {
  const users = await fetch("/api/admin/user", {
    method: "GET",
  });
  const data = await users.json();
  return (
    <div className="container mx-auto pb-8">
      <DataTable columns={columns} data={data.users} />
    </div>
  );
}
