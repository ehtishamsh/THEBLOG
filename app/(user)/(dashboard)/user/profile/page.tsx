import { UploadButton, UploadDropzone } from "@/app/utils/uploadthing";
import GetPath from "@/components/adminPage/GetPath";
import { Button } from "@/components/ui/button";
import UploadImage from "@/components/userPage/UploadImage";
import { authOptions } from "@/lib/auth";
import { UploadCloud } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session === null) {
    return redirect("/sign-in");
  }
  return (
    <div className="px-5 mt-8">
      <GetPath />
      <div className="px-5 mt-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Hi, Welcome back {session?.user?.username} 👋
        </h1>
        <div className="bg-accent rounded-lg w-fit p-1 mt-6">
          <h1 className="text-base  rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
            Profile
          </h1>
        </div>
        <div className="mt-8 flex gap-8">
          <UploadImage imageUrl={session?.user?.image as string} />

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">
              {session?.user?.username}
            </h1>
            <span className="text-base text-muted-foreground">
              {session?.user?.email}
            </span>
            <Button variant={"outline"} className="w-fit">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
