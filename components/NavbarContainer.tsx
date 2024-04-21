import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import Navbar from "./Navbar";

async function NavbarContainer() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar session={session} />
    </>
  );
}

export default NavbarContainer;
