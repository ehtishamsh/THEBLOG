import GetPath from "@/components/adminPage/GetPath";
import Tags from "@/components/adminPage/Tags";
import UserTags from "@/components/adminPage/UserTags";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { authOptions } from "@/lib/auth";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  if (session == null || session.user?.role !== "admin") {
    return redirect("/sign-in");
  } else {
    return (
      <div className="mt-8 px-5 flex flex-col gap-5">
        <GetPath />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <span className="text-sm text-muted-foreground">
              Manage the users.
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <UserTags />
        <DropdownMenuSeparator />
      </div>
    );
  }
}
export default page;
