import Navbar from "@/components/adminPage/Navbar";
import SideBar from "@/components/adminPage/SideBar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="h-screen  flex overflow-hidden">
        <SideBar />
        <div className="w-full pt-16">{children}</div>
      </main>
    </div>
  );
}
