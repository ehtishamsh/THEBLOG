"use client";
import React from "react";
import AuthNav from "./AuthNav";
import NonAuthNav from "./NonAuthNav";
import { useSession } from "next-auth/react";

function NavbarComponet() {
  const { data: session } = useSession();
  return <>{session ? <AuthNav /> : <NonAuthNav />}</>;
}

export default NavbarComponet;
