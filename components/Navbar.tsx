import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ThemeSwitchButton";
import { User2Icon } from "lucide-react";

function Navbar() {
  return (
    <header className="px-5 py-8">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href={"/"} className="font-semibold text-xl">
          The Blog
        </Link>
        <div className="flex justify-center items-center text-xl gap-7">
          <Link href={"/"} className="max-sm:hidden">
            Blog
          </Link>
          <Link href={"/projects"} className="max-sm:hidden">
            Projects
          </Link>
          <Link href={"/create"} className="max-sm:hidden">
            Create Post
          </Link>
          <Link href={"/login"} className="max-sm:hidden">
            <User2Icon width={20} height={20} />
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
