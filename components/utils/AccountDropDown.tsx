"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2Icon } from "lucide-react";

import { BiLogIn, BiSolidUserAccount } from "react-icons/bi";
import SignOut from "../form/SignOut";

export function AccountDropDown({ session }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={` ${
            session?.user ? "rounded-full p-1" : "px-2.5 py-2.5 rounded-lg"
          } bg-background border border-border hover:bg-muted `}
        >
          {session?.user ? (
            <img
              src={session?.user?.image}
              alt="avatar"
              className="object-cover rounded-full w-8 h-8"
            />
          ) : (
            <User2Icon width={20} height={20} />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 max-sm:w-28">
        <DropdownMenuLabel>
          {(session?.user?.username && (
            <p>hey,{session?.user?.username}</p>
          )) || <p>Account</p>}
        </DropdownMenuLabel>
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
              <DropdownMenuItem
                onClick={() => (window.location.href = "/user/profile")}
                className="cursor-pointer"
              >
                Profile
                <DropdownMenuShortcut>
                  <BiSolidUserAccount size={20} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <SignOut />
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
