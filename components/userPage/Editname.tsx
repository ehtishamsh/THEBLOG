"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

function Editname({ userName }: { userName: string }) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>(userName || "");
  const [mouse, setMouse] = useState<boolean>(false);

  function handleDone() {
    update({
      username: (name as string) || userName,
    });
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated",
      variant: "success",
    });
    setOpen(false);
    router.refresh();
  }
  return (
    <>
      <Button
        variant={"outline"}
        className="w-fit"
        onClick={() => setOpen(true)}
      >
        Edit Profile
      </Button>
      <div
        onClick={() => {
          if (!mouse) setOpen(false);
        }}
        className={`transition-all duration-400 flex items-center justify-center w-full h-full absolute inset-0 top-0 left-0 right-0 bottom-0 bg-[#00000088] backdrop-blur-sm z-20 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          onMouseLeave={() => setMouse(false)}
          onMouseEnter={() => setMouse(true)}
          className="bg-background border relative border-border  rounded-md px-4 py-9 flex flex-col gap-5 min-w-72 items-center justify-center"
        >
          <h1 className="text-lg font-semibold text-center">Edit Name</h1>
          <div className=" w-fit flex justify-center items-center flex-col gap-5">
            <Input
              placeholder="Username..."
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleDone} variant={"outline"} className="w-full">
              Done
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant={"outline"}
              className="w-fit absolute top-2 right-2 p-2"
            >
              <X width={20} height={20} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editname;
