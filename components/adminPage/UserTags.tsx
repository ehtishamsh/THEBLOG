import { columns } from "@/app/(dashboard)/admin/users/columns";
import { DataTable } from "@/app/(dashboard)/admin/users/data-table";

export default async function UserTags() {
  const users = await fetch("https://theblogs-ecru.vercel.app/api/admin/user", {
    method: "GET",
  });
  const data = await users.json();
  return (
    <div className="max-w-7xl w-full px-4 mx-auto pb-8 max-sm:px-0">
      <DataTable columns={columns} data={data.users} />
    </div>
  );
}
