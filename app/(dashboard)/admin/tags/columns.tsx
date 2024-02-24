"use client";

import AlertDelete from "@/components/adminPage/AlertDelete";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
// You can use a Zod schema here if you want.
interface Tag {
  id: string;
  tagName: string;
}

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "tagName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tag Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "Action",
    header: "Action",

    id: "actions",
    cell: ({ row }) => {
      const tag = row.original;
      const [open, setOpen] = useState(false);
      const onDelete = async () => {
        try {
          const response = await fetch("/api/admin/tag/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: tag.id }),
          });

          if (response.ok) {
            setOpen(false);
            toast({
              title: "Tag deleted",
              description: "Tag deleted successfully",
            });
          } else {
            throw new Error("Failed to delete tag");
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
                    href={"/admin/tags/[id]"}
                    as={`/admin/tags/${tag?.id}`}
                    className="flex gap-4"
                  >
                    <Edit className="mr-1 h-5 w-5" />
                    Edit
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
