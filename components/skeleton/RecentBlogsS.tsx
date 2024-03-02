import React from "react";
import { Skeleton } from "../ui/skeleton";

function RecentBlogsS() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <Skeleton className="w-full h-[200px]" />
        <Skeleton className="w-full h-[20px] rounded-full" />
        <Skeleton className="w-full h-[20px] rounded-full" />
        <div className="flex gap-4">
          <Skeleton className="w-[70px] h-[20px] rounded-full" />
          <Skeleton className="w-[70px] h-[20px] rounded-full" />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Skeleton className="w-full h-[200px]" />
        <Skeleton className="w-full h-[20px] rounded-full" />
        <Skeleton className="w-full h-[20px] rounded-full" />
        <div className="flex gap-4">
          <Skeleton className="w-[70px] h-[20px] rounded-full" />
          <Skeleton className="w-[70px] h-[20px] rounded-full" />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Skeleton className="w-full h-[200px]" />
        <Skeleton className="w-full h-[20px] rounded-full" />
        <Skeleton className="w-full h-[20px] rounded-full" />
        <div className="flex gap-4">
          <Skeleton className="w-[70px] h-[20px] rounded-full" />
          <Skeleton className="w-[70px] h-[20px] rounded-full" />
        </div>
      </div>
    </>
  );
}

export default RecentBlogsS;
