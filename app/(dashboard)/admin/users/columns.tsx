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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// You can use a Zod schema here if you want.
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: function Cell({ row }) {
      const user = row.original;
      const date = new Date(user.createdAt);
      const formattedDate = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },

  {
    accessorKey: "Action",
    header: "Action",

    id: "actions",
    cell: function Cell({ row }) {
      const user = row.original;
      const [open, setOpen] = useState(false);
      const router = useRouter();
      const onDelete = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/admin/user/delete/${user.id}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            setOpen(false);
            toast({
              title: "User deleted",
              description: "User deleted successfully",
            });
            // Refresh the data
            router.refresh();
          } else {
            throw new Error("Failed to delete User");
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
                    href={"/admin/users/[id]"}
                    as={`/admin/users/${user?.id}`}
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
