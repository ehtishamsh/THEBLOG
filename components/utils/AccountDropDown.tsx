"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User2Icon } from "lucide-react";

import { BiLogIn } from "react-icons/bi";
import SignOut from "../form/SignOut";

export function AccountDropDown({ session }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-2.5 py-2.5 bg-background border border-border hover:bg-muted rounded-lg">
          <User2Icon width={20} height={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 max-sm:w-28">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {session?.user?.role === "admin" ? (
            <DropdownMenuItem
              onClick={() => (window.location.href = "/admin")}
              className="cursor-pointer"
            >
              Admin Dashboard
            </DropdownMenuItem>
          ) : null}
          {!session?.user ? (
            <>
              <DropdownMenuItem
                className=" cursor-pointer"
                onClick={() => (window.location.href = "/sign-in")}
              >
                Sign in
                <DropdownMenuShortcut>
                  <BiLogIn size={20} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className=" cursor-pointer"
                onClick={() => (window.location.href = "/sign-up")}
              >
                Sign up
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <SignOut />
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
