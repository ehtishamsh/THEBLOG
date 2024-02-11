import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ThemeSwitchButton";

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
          <Link href={"/posts"} className="max-sm:hidden">
            Projects
          </Link>
          <Link href={"/newsletter"} className="max-sm:hidden">
            Newsletter
          </Link>
          <Link href={"/about"} className="max-sm:hidden">
            About
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
