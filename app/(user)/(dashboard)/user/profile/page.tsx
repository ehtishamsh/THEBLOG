"use client";
import { UploadButton, UploadDropzone } from "@/app/utils/uploadthing";
import GetPath from "@/components/adminPage/GetPath";
import { Button } from "@/components/ui/button";
import UploadImage from "@/components/userPage/UploadImage";
import { authOptions } from "@/lib/auth";
import { UploadCloud } from "lucide-react";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function page() {
  const { data: session, status } = useSession();
  if (session === null) {
    return redirect("/sign-in");
  }
  return (
    <div className="px-5 mt-8">
      <GetPath />
      <div className="px-5 mt-8">
        {status === "authenticated" ? (
          <motion.h1
            className={`text-3xl font-bold tracking-tight`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Hi, Welcome back {session?.user?.username} 👋
          </motion.h1>
        ) : (
          <Skeleton className="min-w-full h-10" />
        )}

        <div className="bg-accent rounded-lg w-fit p-1 mt-6">
          <h1 className="text-base  rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
            Profile
          </h1>
        </div>
        <div className="mt-8 flex gap-8">
          {status === "authenticated" ? (
            <UploadImage
              imageUrl={session?.user?.image as string}
              email={session?.user?.email as string}
            />
          ) : (
            <Skeleton className="min-w-52 h-52" />
          )}
          <div className="flex flex-col gap-2">
            {status === "authenticated" ? (
              <motion.h1
                className="text-3xl font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {session?.user?.username}
              </motion.h1>
            ) : (
              <Skeleton className="w-[130px] h-8" />
            )}

            {status === "authenticated" ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-base text-muted-foreground"
              >
                {session?.user?.email}
              </motion.span>
            ) : (
              <Skeleton className="w-[130px] h-6" />
            )}

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
