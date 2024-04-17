import React from "react";
import { AvatarIcon } from "@radix-ui/react-icons";
import { BsTags } from "react-icons/bs";
import { EditIcon } from "lucide-react";

async function Dashboard() {
  const getTotal = await fetch(
    "https://theblogs-ecru.vercel.app/api/admin/total",
    {
      method: "GET",
    }
  );
  const total = await getTotal.json();
  return (
    <div className="px-5 mt-8 max-xs:px-2">
      <h1 className="text-3xl font-bold tracking-tight max-sm:text-xl">
        Hi, Welcome back 👋
      </h1>
      <div className="bg-accent rounded-lg w-fit p-1 mt-6">
        <h1 className="text-base max-sm:text-xs  rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
          Overview
        </h1>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 max-sm:gap-2">
        <div className="flex flex-col gap-3  p-6 max-sm:p-2 max-sm:justify-center border border-border  rounded-lg">
          <h1 className="text-sm max-sm:text-xs font-semibold w-full justify-between flex tracking-tight items-center">
            Total Users
            <AvatarIcon className="w-6 h-6 max-sm:h-4 max-sm:w-4 text-muted-foreground" />
          </h1>
          <h1 className="text-2xl max-sm:text-lg font-bold flex flex-col">
            + {total?.totalusers}
            <span className="text-xs text-muted-foreground font-normal">
              Last 30 days
            </span>
          </h1>
        </div>
        <div className="flex flex-col gap-3  p-6 max-sm:p-2 max-sm:justify-center border border-border  rounded-lg ">
          <h1 className="text-sm max-sm:text-xs font-semibold w-full justify-between flex tracking-tight items-center">
            Total Tags
            <BsTags className="w-6 h-6 max-sm:h-4 max-sm:w-4 text-muted-foreground" />
          </h1>
          <h1 className="text-2xl max-sm:text-lg font-bold flex flex-col">
            + {total?.totaltags}
            <span className="text-xs text-muted-foreground font-normal">
              Last 30 days
            </span>
          </h1>
        </div>
        <div className="flex flex-col gap-3  p-6 max-sm:p-2 max-sm:justify-center border border-border  rounded-lg ">
          <h1 className="text-sm max-sm:text-xs font-semibold w-full justify-between flex tracking-tight items-center">
            Total Blogs
            <EditIcon className="w-6 h-6 max-sm:h-4 max-sm:w-4 text-muted-foreground" />
          </h1>
          <h1 className="text-2xl max-sm:text-lg font-bold flex flex-col">
            + {total?.totalblogs}
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
