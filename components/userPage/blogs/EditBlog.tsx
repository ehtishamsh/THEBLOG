"use client";
import React, { useState, useEffect, useCallback } from "react";
import IMG from "next/image";

import { Editor, useEditor } from "@tiptap/react";

import { UploadDropzone } from "@/app/utils/uploadthing";
import BulletList from "@tiptap/extension-bullet-list";
import { object, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getSession, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Multiselect from "@/components/createpostPage/MultiSelect";
import Tiptap from "@/components/createpostPage/Tiptap";
import Delete from "@/components/createpostPage/Delete";
import { extensions } from "./Ext";

interface data {
  id: string;
  title: string;
  content: string;
  description: string;
  image: string;
  slug: string;
  createdAt: string;
  blogDetail: [
    {
      tag: {
        tagName: string;
      };
    }
  ];
}
interface Tag {
  id: string;
  tagName: string;
}
const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(400, "Description is too long"),
});
function EditBlog({
  email,
  id,
}: {
  email: string | null | undefined;
  id: string;
}) {
  const [data, setData] = useState<data>();

  const [tags, setTags] = useState<Tag[]>([]);
  const [cont, setCont] = useState<string>(data?.content as string);
  const [title, setTitle] = useState<string>(data?.title as string);
  const [content, setContent] = useState<string>();
  const [hide, setHide] = useState<boolean>(false);
  const [description, setdescription] = useState<string>(
    data?.description as string
  );
  const [imgurl, setImgurl] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    const fetchTags = async () => {
      const response = await fetch("/api/user/tags");
      const data = await response.json();
      setTags(data.tags);
      setLoading(false);
    };
    fetchTags();
    return () => {
      fetchTags();
    };
  }, []);

  const editor: Editor | null = useEditor({
    extensions,
    content: cont as string,
  });

  const handleSave = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      // TODO: Add validation
      const savedContent = editor?.getHTML();
      // TODO: Add validation
      if (
        !imgurl ||
        !savedContent ||
        savedContent.length <= 300 ||
        !tags ||
        tags.length === 0 ||
        (!tags.length &&
          !savedContent &&
          !imgurl &&
          savedContent?.length <= 300) ||
        !email
      ) {
        let errorMessage = "";

        if (!imgurl) errorMessage = "Please add an image";
        else if (!savedContent || savedContent.length <= 300)
          errorMessage = "Please add content";
        else if (!tags || tags.length === 0) errorMessage = "Please add tags";
        else if (!email) errorMessage = "Please login";
        else if (
          !tags.length &&
          !savedContent &&
          !imgurl &&
          savedContent?.length <= 300
        )
          errorMessage = "Please add content and tags";

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });

        return null;
      }

      // create slug
      const slug =
        values.title
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace one or more spaces with a single hyphen
          .replace(/[^\w-]+/g, "") +
        "-" +
        new Date().getTime();
      // create post
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          title: values.title,
          description: values.description,
          content: `${savedContent}`,
          tags: selectedTags,
          cover: imgurl,
          slug: slug,
        }),
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: "Post created successfully",
          variant: "success",
        });
        setTimeout(() => {
          router.push(`/blog/${slug}`);
        }, 4000);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
    [editor, title, description, selectedTags, imgurl]
  );
  useEffect(() => {
    const fetchcontent = async () => {
      try {
        const response = await fetch(`/api/user/profile/${id}`, {
          method: "GET",
        });
        const blogs = await response.json();
        setData(blogs.data);
        const formatetag: Tag[] = blogs.data.blogDetail.map((item: any) => {
          return { tagName: item.tag.tagName, id: item.tag.id };
        });
        setSelectedTags(formatetag);
        setImgurl(blogs.data.image);
        editor?.commands.clearContent();
        editor?.commands.setContent(
          `<div>${blogs?.data?.content as string}</div>`
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchcontent();
    return () => {
      fetchcontent();
    };
  }, []);

  return (
    <div className="px-2 py-6 mt-7 relative">
      <Form {...form}>
        <form
          className="flex flex-col  max-w-7xl mx-auto"
          onSubmit={form.handleSubmit(handleSave)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className=" text-4xl !outline-none input---title border-none focus:!outline-none max-md:text-3xl max-sm:text-2xl mb-5 transition-all
                              duration-300 placeholder:text-placeholder-default placeholder:italic"
                    placeholder="Enter your title..."
                    {...field}
                    value={data?.title}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h1 className="text-4xl  max-md:text-3xl max-sm:text-2xl mb-5 transition-all p-2 text-placeholder-default italic">
            Upload Cover Image...
          </h1>
          {!hide && (
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files", res);
                setImgurl(res[0].url);
                setLoading(false);
                setHide(true);
              }}
            />
          )}
          <div className="relative max-w-5xl mx-auto mb-6">
            {imgurl && (
              <IMG
                src={imgurl}
                alt="img"
                className="w-full object-cover rounded-lg"
                width={1024}
                height={1024}
              />
            )}

            {imgurl && (
              <Delete imgurl={imgurl} setImgurl={setImgurl} setHide={setHide} />
            )}
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className=" text-2xl !outline-none input---title border-none focus:!outline-none max-md:text-xl max-sm:text-base mb-5 transition-all
                              duration-300 placeholder:text-placeholder-default placeholder:italic"
                    placeholder="Enter your description..."
                    {...field}
                    value={data?.description}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Tiptap editor={editor} />
          <div className="mt-10">
            <Multiselect
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              tags={tags}
            />
          </div>
          <Button type="submit" className="mt-14" variant={"outline"}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default EditBlog;
