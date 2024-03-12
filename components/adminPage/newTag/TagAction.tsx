"use client";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import React from "react";
import GetPath from "../GetPath";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  tagName: z
    .string()
    .min(1, "Tag Name is required")
    .max(40, "Tag Name is too long"),
});
function TagAction() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagName: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(
      "https://theblogs-ecru.vercel.app/api/admin/tag/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tagName: values.tagName,
        }),
      }
    );
    if (response.ok) {
      toast({
        variant: "success",
        title: "Success",
        description: "Tag added successfully",
      });
      form.reset();
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
        <h1 className="text-3xl font-bold tracking-tight">Add Tag</h1>
        <span className="text-sm text-muted-foreground">Add a new tag.</span>
      </div>
      <DropdownMenuSeparator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="tagName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your tag name..."
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
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default TagAction;
