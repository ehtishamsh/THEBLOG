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
import { db } from "@/lib/db";
const formSchema = z.object({
  tagName: z
    .string()
    .min(1, "Tag Name is required")
    .max(40, "Tag Name is too long"),
});
function TagAction({ tag }: { tag: string }) {
  const params = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagName: "",
    },
  });

  useEffect(() => {
    if (tag !== undefined && tag !== "") {
      form.setValue("tagName", tag);
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("/api/admin/tag/add/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params.id,
        tagName: values.tagName,
      }),
    });
    if (response.ok) {
      toast({
        variant: "success",
        title: "Success",
        description: "Tag edited successfully",
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Tag</h1>
        <span className="text-sm text-muted-foreground">
          Edit the existing tag.
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
            Edit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default TagAction;
