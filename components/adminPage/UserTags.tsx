import { columns } from "@/app/(dashboard)/admin/users/columns";
import { DataTable } from "@/app/(dashboard)/admin/users/data-table";

export default async function UserTags() {
  const users = await fetch(
    "https://65d55b523f1ab8c63436c590.mockapi.io/api/v1/tags"
  );
  const data = await users.json();

  return (
    <div className="container mx-auto pb-8">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
