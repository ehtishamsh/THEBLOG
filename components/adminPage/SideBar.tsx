import { User2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

function SideBar() {
  return (
    <nav className="relative h-screen border-r pt-16 lg:block w-72">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <nav className="grid items-start gap-2">
              <Link href={"/"}>
                <span
                  className={
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground bg-accent transparent"
                  }
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
