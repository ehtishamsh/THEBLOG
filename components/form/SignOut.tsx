"use client";
import React from "react";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

function SignOut() {
  return (
    <>
      <DropdownMenuItem
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`,
          })
        }
        className=" cursor-pointer"
      >
        Sign out
        <DropdownMenuShortcut>
          <LogOut width={20} height={20} />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </>
  );
}

export default SignOut;
