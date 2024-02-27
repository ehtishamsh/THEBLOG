"use client";
import React, { useState, useEffect } from "react";
import IMG from "next/image";
import Tiptap from "./Tiptap";
import Multiselect from "./MultiSelect";
import { Editor, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";

import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from "@tiptap/extension-code-block";
import Placeholder from "@tiptap/extension-placeholder";
import Delete from "./Delete";
import { UploadDropzone } from "@/app/utils/uploadthing";
import BulletList from "@tiptap/extension-bullet-list";

const extensions = [
  StarterKit,
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

  BulletList.configure({
    HTMLAttributes: {
      class: " list-disc list-outside mb-4 ml-10",
    },
    keepAttributes: false,
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class:
        "w-full max-h-[540px] object-cover rounded-lg border border-border",
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "list-decimal list-outside mb-4 ml-10",
    },
  }),
];

const content = "";
interface Tag {
  id: string;
  tagName: string;
}
function CreatePost() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [hide, setHide] = useState<boolean>(false);
  const [description, setdescription] = useState<string>("");
  const [imgurl, setImgurl] = useState<string>();

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
  const handleSave = () => {
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
  };

  return (
    <div className="px-2 py-6 mt-7 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-5 ">
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
      </div>
    </div>
  );
}

export default CreatePost;
