"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

function NavbarDashBoard() {
  const path = usePathname();
  return (
    <>
      {path === "/user/blogs" || path === "/user/profile" ? (
        <div className="hidden max-sm:block">
          <Button variant="outline" className="p-1">
            <HamburgerMenuIcon width={25} height={25} />
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default NavbarDashBoard;
