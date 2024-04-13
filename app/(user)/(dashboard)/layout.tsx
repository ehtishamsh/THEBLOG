"use client";
import Provider from "@/app/utils/context/Provider";
import SideBar from "@/components/userPage/SideBar";

import { Session, getServerSession } from "next-auth";

import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function layout({ children }: Props) {
  return (
    <div className="max-w-7xl flex  mx-auto overflow-hidden">
      <Provider>
        <SideBar /> <div className=" pt-2 w-full">{children}</div>
      </Provider>
    </div>
  );
}
