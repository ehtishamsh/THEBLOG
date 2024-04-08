"use client";
import { usePathname } from "next/navigation";
import React, { MouseEventHandler, useState } from "react";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";

function NavbarDashBoard() {
  const [open, setOpen] = useState<boolean>(false);
  const path = usePathname();

  return (
    <>
      <div className="hidden max-sm:block">
        <Button
          variant="outline"
          className={`p-1 ${open ? "z-[9999] absolute top-4 left-4" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <X width={25} height={25} />
          ) : (
            <HamburgerMenuIcon width={25} height={25} />
          )}
        </Button>
        {path === "/user/blogs" || path === "/user/profile" ? (
          <div
            className={`${
              open ? "block" : "hidden"
            } text-white w-[65vw] h-screen bg-black absolute top-0 left-0 z-50`}
          >
            <div className="w-full h-full relative"></div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default NavbarDashBoard;
