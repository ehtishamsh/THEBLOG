"use client";
import React, { useState, useEffect } from "react";

import Tiptap from "./Tiptap";
import Multiselect from "./MultiSelect";
import { Editor, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";

import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from "@tiptap/extension-code-block";
import Placeholder from "@tiptap/extension-placeholder";
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
      class: "text-base dark:text-gray-200 text-gray-600 mb-2",
    },
  }),
  Placeholder.configure({
    placeholder: "Write something... ",
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class:
        "dark:bg-slate-700 bg-slate-700  dark:text-gray-300 text-gray-400 text-sm font-mono my-4 flex  rounded-md p-4",
    },
  }),
  ListItem.configure({
    HTMLAttributes: {
      class: "list-disc list-outside mb-4 ml-10",
    },
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: "w-full max-h-[400px] object-cover",
    },
  }),
];
const content = "";
interface Tag {
  id: number;
  name: string;
}
const demoTags: Tag[] = [
  { id: 1, name: "Design" },
  { id: 2, name: "JavaScript" },
  { id: 3, name: "Tailwind CSS" },
  { id: 4, name: "Node.js" },
  { id: 5, name: "GraphQL" },
  { id: 6, name: "Redux" },
];
function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  const editor: Editor | null = useEditor({ extensions, content });
  const handleSave = () => {
    const savedContent = editor?.getHTML();
    // Here you can save the content to your backend or wherever it needs to be saved.
    // Example: api.saveContent(savedContent);
    console.log("Content saved:", [
      { title, content: `${savedContent}`, tags: selectedTags },
    ]);
  };
  return (
    <div className="px-2 py-6 mt-7 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        <input
          type="text"
          className=" outline-none p-2 bg-transparent text-4xl max-md:text-3xl max-sm:text-2xl mb-5 transition-all duration-300 placeholder:text-placeholder-default placeholder:italic"
          placeholder="Write the title here..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <Tiptap editor={editor} />
        <Multiselect
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          demoTags={demoTags}
        />
        <button
          onClick={handleSave}
          className="w-full dark:bg-background  text-white px-4 py-2 rounded-md dark:hover:bg-muted border dark:border-border transition-all duration-300"
        >
          Save
        </button>
      </div>
      <div
        className={`h-[80vh] max-md:h-[70vh] z-999 absolute  dark:bg-background bg-white inset-0 flex items-center transition-all duration-300 justify-center ${
          !loading
            ? "opacity-0 [visibility:hidden]"
            : "opacity-100 [visibility:visible]"
        }`}
      >
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-gray-200"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
