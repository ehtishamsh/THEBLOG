import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import React from "react";
import GetPath from "../GetPath";

function TagAction() {
  return (
    <div className=" flex flex-col gap-5 ">
      <GetPath />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Tag</h1>
        <span className="text-sm text-muted-foreground">
          Edit the existing tag.
        </span>
      </div>
      <DropdownMenuSeparator />
      <div className="flex flex-col gap-5 text-sm">
        <label
          htmlFor="tag"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Tag Name
        </label>
        <Input
          type="text"
          id="tag"
          placeholder="Tag Name"
          className="max-w-96"
        />
      </div>
    </div>
  );
}

export default TagAction;
