"use client";
import { AvatarIcon, DashboardIcon } from "@radix-ui/react-icons";
import { User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideBar() {
  const path = usePathname();
  return (
    <nav className="relative h-screen border-r  lg:block w-72">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <nav className="grid items-start">
              <Link href={"/user/profile"} className="mt-5">
                <span
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    path === "/profile" ? "bg-accent" : ""
                  } transparent`}
                >
                  <AvatarIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </span>
              </Link>
              <Link href={"/admin/tags"} className="mt-5">
                <span
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    path === "/admin/tags" ? "bg-accent" : ""
                  } transparent`}
                >
                  <User2Icon className="mr-2 h-4 w-4" />
                  <span>Tags</span>
                </span>
              </Link>
              <Link href={"/admin/users"} className="mt-5">
                <span
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    path === "/admin/users" ? "bg-accent" : ""
                  } transparent`}
                >
                  <User2Icon className="mr-2 h-4 w-4" />
                  <span>Users</span>
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
