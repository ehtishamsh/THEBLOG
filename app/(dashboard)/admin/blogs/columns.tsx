"use client";

import AlertDelete from "@/components/adminPage/AlertDelete";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import GetColor from "@/components/utils/GetColor";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// You can use a Zod schema here if you want.
interface blog {
  id: string;
  blogDetail: [
    {
      user: {
        username: string;
      };
      tag: {
        tagName: string;
      };
    }
  ];
  createdAt: string;

  image: string;
  slug: string;
  title: string;
}

export const columns: ColumnDef<blog>[] = [
  {
    accessorKey: "image",
    header: "Cover",
    cell: function Cell({ row }) {
      const blog = row.original;
      return (
        <img
          src={blog.image}
          className="max-w-40 max-sm:max-w-20 border border-border rounded-lg"
          alt="cover image"
        />
      );
    },
  },
  {
    accessorKey: "Username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: function Cell({ row }) {
      const blog = row.original;
      const getName = blog.blogDetail[0].user.username;
      return (
        <p className="line-clamp-1 max-sm:text-xs bg-muted p-1 text-center rounded-full">
          {getName}
        </p>
      );
    },
  },
  {
    accessorKey: "Title",

    cell: function Cell({ row }) {
      const blog = row.original;
      return <p className="line-clamp-1 max-sm:text-xs">{blog.title}</p>;
    },
  },
  {
    accessorKey: "Tags",
    header: "Tags",
    cell: function Cell({ row }) {
      const blog = row.original;
      const mapTags: string[] = blog.blogDetail.map((tag) => {
        const createTag = tag.tag.tagName;
        return createTag;
      });
      const createElement: JSX.Element[] = mapTags.map((tag) => {
        return (
          <GetColor
            key={tag}
            tagName={tag}
            padding="p-1"
            textSize="text-xs max-sm:text-xs"
          />
        );
      });
      return (
        <div className="flex gap-2 flex-wrap items-center">{createElement}</div>
      );
    },
  },
  {
    accessorKey: "Action",
    header: "Action",

    id: "actions",
    cell: function Cell({ row }) {
      const blog = row.original;
      const [open, setOpen] = useState(false);
      const onDelete = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/admin/blog", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: blog.id }),
          });

          if (response.ok) {
            setOpen(false);
            toast({
              title: "Blog deleted",
              description: "Blog deleted successfully",
            });
          } else {
            throw new Error("Failed to delete Blog");
          }
        } catch (error) {
          console.error(error);
          setOpen(false);
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      };
      return (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={"/blog/[id]"}
                    as={`/blog/${blog.slug}`}
                    className="flex gap-4"
                  >
                    <Eye className="mr-1 h-5 w-5" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={`cursor-pointer`}>
                  <DialogTrigger className="flex gap-4">
                    <Trash className="mr-1 h-5 w-5" />
                    Delete
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDelete onConfirm={onDelete} />
          </Dialog>
        </>
      );
    },
  },
];
