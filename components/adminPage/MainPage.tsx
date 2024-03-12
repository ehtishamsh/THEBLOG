import React from "react";
import Dashboard from "./Dashboard";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function MainPage() {
  const serverSession = await getServerSession(authOptions);
  if (serverSession === null) {
    return redirect("/sign-in");
  } else if (serverSession?.user?.role !== "admin") {
    return redirect("/home");
  } else {
    return (
      <div className="relative">
        <Dashboard />
      </div>
    );
  }
}

export default MainPage;
