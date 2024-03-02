import React from "react";
import { Skeleton } from "../ui/skeleton";

function DetailBlogS() {
  return (
    <>
      <Skeleton className="w-[200px] h-[20px] rounded-full max-sm:w-[100px]" />
      <Skeleton className="w-full h-[20px] rounded-full" />
      <Skeleton className="w-full h-[20px] rounded-full" />
      <Skeleton className="w-full h-[400px] max-sm:h-[200px]" />
      <Skeleton className="w-full h-[20px] rounded-full" />
      <Skeleton className="w-full h-[20px] rounded-full" />
      <div className="flex gap-4">
        <Skeleton className="w-[200px] h-[20px] rounded-full" />
        <Skeleton className="w-[200px] h-[20px] rounded-full" />
      </div>
    </>
  );
}

export default DetailBlogS;
