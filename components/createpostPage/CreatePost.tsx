"use client";
import React, { useState, useEffect, useCallback } from "react";
import IMG from "next/image";
const Tiptap = dynamic(() => import("./Tiptap"));
const Multiselect = dynamic(() => import("./MultiSelect"));
const Delete = dynamic(() => import("./Delete"));
import { Editor, useEditor } from "@tiptap/react";
import { UploadDropzone } from "@/app/utils/uploadthing";
import dynamic from "next/dynamic";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

import { useRouter } from "next/navigation";
import { extensions } from "../userPage/blogs/Ext";

const content = "";
interface Tag {
  id: string;
  tagName: string;
}

function CreatePost({ email }: { email: string | null | undefined }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [hide, setHide] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [imgurl, setImgurl] = useState<string>();

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

  const editor: Editor | null = useEditor({ extensions, content });

  const handleSave = async () => {
    // TODO: Add validation
    const savedContent = editor?.getHTML();
    // TODO: Add validation
    if (
      !title ||
      !description ||
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
      else if (!title) errorMessage = "Please add a title";
      else if (title.length > 100) errorMessage = "Title is too long";
      else if (title.length < 30) errorMessage = "Title is too short";
      else if (!description) errorMessage = "Please add a description";
      else if (description.length > 300)
        errorMessage = "Description is too long";
      else if (description.length < 100)
        errorMessage = "Description is too short";
      else if (!tags || tags.length === 0) errorMessage = "Please add tags";
      else if (!email) errorMessage = "Please login";
      else if (
        !title &&
        !description &&
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
      title
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
        title: title,
        description: description,
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
  };
  return (
    <div className="px-2 py-6 mt-7 relative">
      <div className="flex flex-col gap-5 max-w-7xl mx-auto">
        <Input
          className=" text-4xl !outline-none input---title border-none focus:!outline-none max-md:text-3xl max-sm:text-2xl mb-5 transition-all
                              duration-300 placeholder:text-placeholder-default placeholder:italic"
          placeholder="Enter your title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <h1 className="text-4xl  max-md:text-3xl max-sm:text-2xl mb-5 transition-all p-2 text-placeholder-default italic">
          Upload Cover Image...
        </h1>
        {!hide && (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
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
        <Input
          className=" text-4xl !outline-none input---title border-none focus:!outline-none max-md:text-3xl max-sm:text-2xl mb-5 transition-all
                              duration-300 placeholder:text-placeholder-default placeholder:italic"
          placeholder="Enter your description..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <Tiptap editor={editor} />
        <div className="mt-10">
          <Multiselect
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            tags={tags}
          />
        </div>
        <Button
          type="submit"
          className="mt-14"
          variant={"outline"}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default CreatePost;
