"use client";
import React, { useState, useEffect, useCallback } from "react";
import IMG from "next/image";
const Tiptap = dynamic(() => import("./Tiptap"));
const Multiselect = dynamic(() => import("./MultiSelect"));
const Delete = dynamic(() => import("./Delete"));
import { Editor, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";

import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import CodeBlock from "@tiptap/extension-code-block";
import Placeholder from "@tiptap/extension-placeholder";
import { UploadDropzone } from "@/app/utils/uploadthing";
import BulletList from "@tiptap/extension-bullet-list";
import dynamic from "next/dynamic";
import { object, z } from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Heading.configure({ levels: [1, 2, 3] }).extend({
    levels: [1, 2, 3],
    renderHTML({ node, HTMLAttributes }) {
      const level = this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : this.options.levels[0];
      const classes: Record<number, string> = {
        1: "text-4xl",
        2: "text-2xl",
        3: "text-xl",
      };
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `font-bold ${classes[level]}`,
        }),
        0,
      ];
    },
  }),
  Paragraph.configure({
    HTMLAttributes: {
      class: "text-base dark:text-gray-200 text-gray-600 mb-2 relative",
    },
  }),
  Placeholder.configure({
    placeholder: "Write the content here... ",
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class:
        "dark:bg-slate-700 bg-slate-700  dark:text-gray-300 text-gray-400 text-sm font-mono my-4 flex  rounded-md p-4",
    },
  }),

  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class:
        "w-full max-h-[540px] object-cover rounded-lg border border-border",
    },
  }),
  ListItem.configure({
    HTMLAttributes: {
      class: "my-2 ml-6",
    },
  }),
];

const content = "";
interface Tag {
  id: string;
  tagName: string;
}
const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title is too long"),
  coverImage: z.string().min(1, "Cover Image is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(250, "Description is too long"),
  tags: z.array(z.string().min(1, "Tag is required")),
  content: z.string().min(1, "Content is required"),
});
function CreatePost() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [hide, setHide] = useState<boolean>(false);
  const [description, setdescription] = useState<string>("");
  const [imgurl, setImgurl] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      coverImage: "",
      description: "",
      tags: [],
      content: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchTags = async () => {
      const response = await fetch("http://localhost:3000/api/user/tags");
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
  const handleSave = useCallback(() => {
    const savedContent = editor?.getHTML();
    console.log("Content saved:", [
      {
        title,
        description,
        content: `${savedContent}`,
        tags: selectedTags,
        img: imgurl,
        slug:
          title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "") +
          "-" +
          Date.now().toFixed(0),
      },
    ]);
  }, [editor]);

  return (
    <div className="px-2 py-6 mt-7 relative">
      <Form {...form}>
        <input
          type="text"
          className=" outline-none p-2 bg-transparent text-4xl max-md:text-3xl max-sm:text-2xl mb-5 transition-all duration-300 placeholder:text-placeholder-default placeholder:italic"
          placeholder="Write the title here..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <h1 className="text-4xl max-md:text-3xl max-sm:text-2xl mb-5 transition-all p-2 text-placeholder-default italic">
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
        <input
          type="text"
          className=" outline-none p-2 bg-transparent text-2xl max-md:text-xl max-sm:text-lg  mb-5 transition-all duration-300 placeholder:text-placeholder-default placeholder:italic"
          placeholder="Write the description here..."
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />

        <Tiptap editor={editor} />
        <Multiselect
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tags={tags}
        />
        <button
          onClick={handleSave}
          className="w-full bg-[hsl(240_,10%_,3.9%)] px-4 py-2 rounded-md  border border-[hsl(240_,3.7%_,15.9%)] hover:bg-[hsl(240_,3.7%_,15.9%)] text-white transition-all duration-300"
        >
          Save
        </button>

        <li className="list-disc list-outside ">dfkldfjkldfjkldf</li>
      </Form>
    </div>
  );
}

export default CreatePost;
