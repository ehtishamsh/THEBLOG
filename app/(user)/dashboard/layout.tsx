import GetPath from "@/components/adminPage/GetPath";
import SideBar from "@/components/userPage/SideBar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex overflow-hidden">
        <SideBar /> {children}
      </div>
    </>
  );
}

export default layout;
