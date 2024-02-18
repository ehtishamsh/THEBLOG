import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ThemeSwitchButton";
import { User2Icon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AccountDropDown } from "./utils/AccountDropDown";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="px-5 py-8">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href={"/"} className="font-semibold text-xl">
          The Blog
        </Link>
        <div className="flex justify-center items-center text-xl gap-4">
          <Link href={"/"} className="max-sm:hidden">
            Blog
          </Link>
          <Link href={"/projects"} className="max-sm:hidden">
            Projects
          </Link>

          {session?.user ? (
            <Link href={"/create"} className="max-sm:hidden">
              Create Post
            </Link>
          ) : null}
          <AccountDropDown session={session} />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
