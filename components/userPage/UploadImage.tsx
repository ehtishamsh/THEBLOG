"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UploadCloud } from "lucide-react";
import { UploadButton } from "@/app/utils/uploadthing";
import Image from "next/image";
import { getSession } from "next-auth/react";

function UploadImage({ imageUrl }: { imageUrl: string }) {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState<any>();
  return (
    <div className="w-full ">
      <div className="w-full h-full relative">
        <Image
          src={imageUrl as string}
          alt="profile"
          className="rounded-3xl border-2 border-border"
          width={200}
          height={200}
        />
        <Button
          onClick={() => setOpen(!open)}
          className="absolute bottom-2 right-2 rounded-full w-11 p-0 h-11 "
          variant={"outline"}
        >
          <UploadCloud width={20} height={20} />
        </Button>
      </div>
      <div
        className={`transition-all duration-400 flex items-center justify-center w-full h-full absolute inset-0 top-0 left-0 right-0 bottom-0 bg-[#00000088] backdrop-blur-sm z-20 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="bg-background border border-border rounded-md p-4 ">
          <h1 className="text-lg font-semibold">Upload Profile</h1>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(file) => {
              setImg(file);
            }}
            onUploadError={(error) => {
              console.error(error);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
