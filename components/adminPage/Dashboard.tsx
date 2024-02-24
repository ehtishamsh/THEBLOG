import React from "react";
import { AvatarIcon } from "@radix-ui/react-icons";
import { GETBLOGS, GETTAGS, GETUSER } from "@/app/api/admin/total/route";
import { BsTags,  } from "react-icons/bs";
import { EditIcon } from "lucide-react";

async function Dashboard() {
  const getTotalUser = await GETUSER();
  const getTotalTags = await GETTAGS();
  const getTotalBlogs = await GETBLOGS();
  return (
    <div className="px-5 mt-8">
      <h1 className="text-3xl font-bold tracking-tight">Hi, Welcome back 👋</h1>
      <div className="bg-accent rounded-lg w-fit p-1 mt-6">
        <h1 className="text-base  rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
          Overview
        </h1>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-3  p-6 border border-border  rounded-lg">
          <h1 className="text-sm font-semibold w-full justify-between flex tracking-tight items-center">
            Total Users
            <AvatarIcon className="w-6 h-6 text-muted-foreground" />
          </h1>
          <h1 className="text-2xl font-bold flex flex-col">
            + {getTotalUser?.total}
            <span className="text-xs text-muted-foreground font-normal">
              Last 30 days
            </span>
          </h1>
        </div>
        <div className="flex flex-col gap-3  p-6 border border-border  rounded-lg">
          <h1 className="text-sm font-semibold w-full justify-between flex tracking-tight items-center">
            Total Tags
            <BsTags className="w-6 h-6 text-muted-foreground" />
          </h1>
          <h1 className="text-2xl font-bold flex flex-col">
            + {getTotalTags?.total}
            <span className="text-xs text-muted-foreground font-normal">
              Last 30 days
            </span>
          </h1>
        </div>
        <div className="flex flex-col gap-3  p-6 border border-border  rounded-lg">
          <h1 className="text-sm font-semibold w-full justify-between flex tracking-tight items-center">
            Total Blogs
            <EditIcon className="w-6 h-6 text-muted-foreground" />
          </h1>
          <h1 className="text-2xl font-bold flex flex-col">
            + {getTotalBlogs?.total}
            <span className="text-xs text-muted-foreground font-normal">
              Last 30 days
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
