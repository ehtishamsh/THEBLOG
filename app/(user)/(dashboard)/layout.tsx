import GetPath from "@/components/adminPage/GetPath";
import SideBar from "@/components/userPage/SideBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (session === null) {
    return redirect("/sign-in");
  }
  if (session.user?.role !== "user") {
    return redirect("/home");
  }
  return (
    <>
      <div className="flex overflow-hidden">
        <SideBar /> {children}
      </div>
    </>
  );
}

export default layout;
