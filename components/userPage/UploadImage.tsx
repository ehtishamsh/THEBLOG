"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UploadCloud, X } from "lucide-react";
import { UploadButton } from "@/app/utils/uploadthing";
import Image from "next/image";
import { motion } from "framer-motion";
import Delete from "../createpostPage/Delete";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function UploadImage({ imageUrl, email }: { imageUrl: string; email: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");
  const { data: session, update } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (img !== "") {
      setTimeout(async () => {
        const res = await fetch("/api/uploadthing", {
          method: "DELETE",
          body: JSON.stringify({
            url: img,
          }),
        });
        if (res.ok) {
          setImg("");
          toast({
            title: "Alert",
            description: "Your image has been removed",
            variant: "default",
          });
        } else {
          toast({
            title: "Alert",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
        console.log(img);
      }, 40000);
    }
  }, [img]);

  function handleDone() {
    update({
      image: img as string,
    });
    setOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated",
      variant: "success",
    });
    setImg("");

    router.refresh();
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="w-48 max-sm:w-full ">
          <Image
            src={imageUrl as string}
            alt="profile"
            className="rounded-3xl  w-full h-full object-cover border-2 border-border"
            width={192}
            height={192}
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
          />
        </div>
        <Button
          onClick={() => setOpen(!open)}
          className="absolute bottom-1 right-1 rounded-full w-11 p-0 h-11 "
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
        <div className="bg-background border relative border-border rounded-md px-4 py-9 flex flex-col gap-5 min-w-72 items-center justify-center">
          <h1 className="text-lg font-semibold text-center">Upload Image</h1>
          <div className="relative w-fit flex justify-center items-center">
            {img && (
              <>
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={img}
                  alt="profile"
                  className="rounded-3xl border-2 border-border max-h-52 object-contain"
                />
                <motion.div
                  className="absolute top-1 right-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Delete imgurl={img} setImgurl={setImg} setHide={setOpen} />
                </motion.div>
              </>
            )}
          </div>

          {!img && (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(file) => {
                setImg(file[0].url);
              }}
              onUploadError={(error) => {
                console.error(error);
              }}
            />
          )}
          {img && (
            <Button onClick={handleDone} className="w-fit" variant={"outline"}>
              Done
            </Button>
          )}
          <Button
            onClick={() => setOpen(false)}
            variant={"outline"}
            className="w-fit absolute top-2 right-2 p-2"
          >
            <X width={20} height={20} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default UploadImage;
