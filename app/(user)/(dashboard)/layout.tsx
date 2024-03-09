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
    <div className="flex overflow-hidden">
      <Provider>
        <SideBar /> <div className="w-full pt-2">{children}</div>
      </Provider>
    </div>
  );
}
