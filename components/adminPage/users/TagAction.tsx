"use client";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import GetPath from "../GetPath";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { redirect, useParams, useRouter } from "next/navigation";
const formSchema = z.object({
  username: z
    .string()
    .min(1, "User Name is required")
    .max(40, "User Name is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
});
function TagAction({ name, emailAdd }: { name: string; emailAdd: string }) {
  const params = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    if (
      name !== undefined &&
      name !== "" &&
      emailAdd !== undefined &&
      emailAdd !== ""
    ) {
      form.setValue("username", name);
      form.setValue("email", emailAdd);
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(
      `http://localhost:3000/api/admin/user/getSingle/${params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
        }),
      }
    );
    if (response.ok) {
      toast({
        variant: "success",
        title: "Success",
        description: "User edited successfully",
      });
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  }
  return (
    <div className=" flex flex-col gap-5 ">
      <GetPath />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
        <span className="text-sm text-muted-foreground">
          Edit the existing user.
        </span>
      </div>
      <DropdownMenuSeparator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username..."
                    {...field}
                    className="max-w-96"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email..."
                    {...field}
                    className="max-w-96"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DropdownMenuSeparator />
          <Button variant="default" className="max-w-96">
            Edit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default TagAction;
