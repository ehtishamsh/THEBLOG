"use client";

import * as React from "react";
import {
  DropdownMenuCheckboxItemProps,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2Icon } from "lucide-react";
import Link from "next/link";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function AccountDropDown({ session }: any) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-2.5 py-2.5 bg-background border border-border hover:bg-muted rounded-lg">
          <User2Icon width={20} height={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          {session?.user}
          <>
            <Link
              href={"/sign-in"}
              className="transition-all duration-400  text-center"
            >
              Sign in
            </Link>
            <Link
              href={"/sign-up"}
              className="transition-all duration-400  text-center"
            >
              Sign up
            </Link>
          </>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
