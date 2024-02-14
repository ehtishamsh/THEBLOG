import {
  Editor,
  EditorContent,
  mergeAttributes,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  BoldIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import {
  AlignLeftIcon,
  AlignRightIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import { BiParagraph } from "react-icons/bi";
import { GrOrderedList } from "react-icons/gr";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import ImageUploadModal from "./ImageUploadModel";
import { GoHorizontalRule } from "react-icons/go";
import { BsBlockquoteLeft } from "react-icons/bs";
import { PiCodeBlock } from "react-icons/pi";
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
      class: "text-base dark:text-gray-400 text-gray-600 mb-2",
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
function Tiptap() {
  const editor: Editor | null = useEditor({ extensions, content });
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const handlePreview = () => {
    const preview = editor?.getHTML();
    setPreviewContent(preview || "");
  };

  const handleSave = () => {
    const savedContent = editor?.getHTML();
    // Here you can save the content to your backend or wherever it needs to be saved.
    // Example: api.saveContent(savedContent);
    console.log("Content saved:", savedContent);
  };
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const addImage = useCallback(
    (imageUrl: string) => {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      closeModal();
    },
    [editor]
  );

  if (!editor) {
    return null;
  }
  return (
    <div>
      <div className="flex gap-3 flex-wrap items-center p-2 bg-gray-800 justify-center  rounded-lg">
        <button onClick={openModal}>
          <ImageIcon size={20} className="text-gray-400" />
        </button>
        {isModalOpen && (
          <ImageUploadModal
            setModalOpen={setModalOpen}
            onImageUpload={(imageUrl) => addImage(imageUrl)}
          />
        )}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          {editor.isActive("bold") ? (
            <Bold size={20} className="text-gray-400" />
          ) : (
            <BoldIcon size={20} className="text-gray-400" />
          )}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Italic size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <Strikethrough size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <Code width={20} height={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <BiParagraph size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <Heading1 size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <Heading2 size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <Heading3 size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <AlignLeft width={20} height={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          <AlignCenter width={20} height={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <AlignRight width={20} height={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
        >
          <AlignJustify width={20} height={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <ListBulletIcon width={20} height={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <GrOrderedList width={20} height={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <PiCodeBlock width={20} height={20} className="text-gray-400" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <BsBlockquoteLeft width={20} height={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <GoHorizontalRule width={20} height={20} className="text-gray-400" />
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo width={20} height={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo width={20} height={20} className="text-gray-400" />
        </button>
      </div>
      <div className="mt-9">
        <EditorContent editor={editor} />
      </div>
      <div className="flex gap-3 flex-col items-center w-full mt-8">
        <button
          onClick={handlePreview}
          className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Preview
        </button>
        <h1 className="text-gray-400">OR</h1>
        <button
          onClick={handleSave}
          className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Save
        </button>
      </div>
      <div className="mt-9">
        {previewContent ? (
          <div dangerouslySetInnerHTML={{ __html: previewContent }} />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  );
}

export default Tiptap;
