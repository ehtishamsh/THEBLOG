import GetPath from "@/components/adminPage/GetPath";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import GetColor from "@/components/utils/GetColor";
import { Edit, Plus, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="px-2 max-w-6xl">
      <div className="mt-8 px-5 flex flex-col gap-5 w-full">
        <GetPath />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
            <span className="text-sm text-muted-foreground">
              Manage your blogs
            </span>
          </div>
          <Link
            href={"/create"}
            className="flex items-center gap-5 bg-foreground text-black border-placeholder-default border px-3 py-2 rounded-lg"
          >
            <Plus width={20} height={20} /> Add New
          </Link>
        </div>
        <DropdownMenuSeparator />
        <div className=" grid grid-cols-6 w-full gap-5 justify-center items-center text-center bg-foreground text-black border-placeholder-default border px-3 py-2 rounded-lg">
          <span className="text-sm font-semibold">Cover Image</span>
          <span className="text-sm font-semibold">Title</span>
          <span className="text-sm font-semibold col-span-2">Description</span>
          <span className="text-sm font-semibold">Tags</span>
          <span className="text-sm font-semibold">Actions</span>
        </div>
        <div className="flex flex-col w-full gap-6">
          <Link href={"/user/blogs/1"}>
            <div className="grid grid-cols-6 items-center justify-between gap-5 bg-foreground text-black border-placeholder-default border px-3 py-2 rounded-lg">
              <img
                src="https://source.unsplash.com/random"
                alt=""
                className=" object-contain rounded-lg"
              />
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm">
                  Why is the sky blue?
                </span>

                <span className="text-sm text-muted-foreground">5 min ago</span>
              </div>

              <span className="text-sm text-muted-foreground col-span-2 line-clamp-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Similique doloribus quibusdam incidunt quis id quas laboriosam
                iste ex quae cumque magnam, nemo voluptatibus nobis mollitia
                voluptatem inventore fugiat dolorem quia!
              </span>
              <div className="flex gap-2 flex-wrap text-center py-2">
                <GetColor tagName={"Design"} />
                <GetColor tagName={"Frontend"} />
                <GetColor tagName={"Backend"} />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className=" text-white w-full rounded-full p-1"
                >
                  <Edit width={20} height={20} />
                </Button>
                <Button
                  variant="outline"
                  className=" text-white w-full p-1 rounded-full"
                >
                  <Trash width={20} height={20} />
                </Button>
              </div>
            </div>
          </Link>
          <Link href={"/user/blogs/1"}>
            <div className="grid grid-cols-6 items-center justify-between gap-5 bg-foreground text-black border-placeholder-default border px-3 py-2 rounded-lg">
              <img
                src="https://source.unsplash.com/random"
                alt=""
                className=" object-contain rounded-lg"
              />
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm">
                  Why is the sky blue?
                </span>

                <span className="text-sm text-muted-foreground">5 min ago</span>
              </div>

              <span className="text-sm text-muted-foreground col-span-2 line-clamp-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Similique doloribus quibusdam incidunt quis id quas laboriosam
                iste ex quae cumque magnam, nemo voluptatibus nobis mollitia
                voluptatem inventore fugiat dolorem quia!
              </span>
              <div className="flex gap-2 flex-wrap text-center py-2">
                <GetColor tagName={"Design"} />
                <GetColor tagName={"Frontend"} />
                <GetColor tagName={"Backend"} />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className=" text-white w-full rounded-full p-1"
                >
                  <Edit width={20} height={20} />
                </Button>
                <Button
                  variant="outline"
                  className=" text-white w-full p-1 rounded-full"
                >
                  <Trash width={20} height={20} />
                </Button>
              </div>
            </div>
          </Link>
          <Link href={"/user/blogs/1"}>
            <div className="grid grid-cols-6 items-center justify-between gap-5 bg-foreground text-black border-placeholder-default border px-3 py-2 rounded-lg">
              <img
                src="https://source.unsplash.com/random"
                alt=""
                className=" object-contain rounded-lg"
              />
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm">
                  Why is the sky blue?
                </span>

                <span className="text-sm text-muted-foreground">5 min ago</span>
              </div>

              <span className="text-sm text-muted-foreground col-span-2 line-clamp-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Similique doloribus quibusdam incidunt quis id quas laboriosam
                iste ex quae cumque magnam, nemo voluptatibus nobis mollitia
                voluptatem inventore fugiat dolorem quia!
              </span>
              <div className="flex gap-2 flex-wrap text-center py-2">
                <GetColor tagName={"Design"} />
                <GetColor tagName={"Frontend"} />
                <GetColor tagName={"Backend"} />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className=" text-white w-full rounded-full p-1"
                >
                  <Edit width={20} height={20} />
                </Button>
                <Button
                  variant="outline"
                  className=" text-white w-full p-1 rounded-full"
                >
                  <Trash width={20} height={20} />
                </Button>
              </div>
            </div>
          </Link>
        </div>
        <DropdownMenuSeparator />
      </div>
    </div>
  );
}

export default page;
