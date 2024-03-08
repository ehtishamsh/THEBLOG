"use client";
import GetPath from "@/components/adminPage/GetPath";
import SideBar from "@/components/userPage/SideBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

function layout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <div className="flex overflow-hidden">
        <SideBar /> {children}
      </div>
    </SessionProvider>
  );
}

export default layout;
