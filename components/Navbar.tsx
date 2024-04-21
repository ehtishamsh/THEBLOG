"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ModeToggle } from "./ThemeSwitchButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AccountDropDown } from "./utils/AccountDropDown";
import NavbarDashBoard from "./userPage/NavbarDashBoard";
import SearchInput from "./Search/SearchInput";
import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useMotionValueEvent, useScroll } from "framer-motion";

function Navbar({ session }: any) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY?.getPrevious();
    if (latest > (prev || 0) && latest - 100 > 550) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <motion.header
      variants={{
        visible: {
          y: 0,
        },
        hidden: {
          y: "-100%",
        },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="px-5 py-5 fixed top-0 right-0 left-0 z-50 bg-background border-b border-border"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex justify-center gap-3 items-center">
          <NavbarDashBoard />
          <Link href={"/"} className="font-semibold text-xl">
            The Blog
          </Link>
        </div>
        <div className="flex justify-center items-center text-xl gap-4">
          <div className="flex justify-center items-center text-xl gap-4 max-sm:hidden">
            <SearchInput />

            {session?.user ? (
              <Link href={"/create"} className="max-sm:hidden ">
                <Button variant={"outline"} className="px-2 py-1">
                  <Edit className="h-5 w-5" />
                </Button>
              </Link>
            ) : null}
          </div>
          <AccountDropDown session={session} />
          <ModeToggle />
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
