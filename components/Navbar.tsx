import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ThemeSwitchButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AccountDropDown } from "./utils/AccountDropDown";
import NavbarDashBoard from "./userPage/NavbarDashBoard";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="px-5 py-8">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex justify-center gap-3 items-center">
          <NavbarDashBoard />
          <Link href={"/"} className="font-semibold text-xl">
            The Blog
          </Link>
        </div>
        <div className="flex justify-center items-center text-xl gap-4">
          <div className="flex justify-center items-center text-xl gap-4 max-sm:hidden">
            <Link href={"/"} className="max-sm:hidden">
              Blog
            </Link>
            <Link
              href={"https://ehtishamshah.vercel.app/"}
              target="_blank"
              className="max-sm:hidden"
            >
              Portfolio
            </Link>

            {session?.user ? (
              <Link href={"/create"} className="max-sm:hidden">
                Create Post
              </Link>
            ) : null}
          </div>
          <AccountDropDown session={session} />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
