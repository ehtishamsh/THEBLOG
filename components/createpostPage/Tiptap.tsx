import { Editor, EditorContent } from "@tiptap/react";
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
import { ListBulletIcon } from "@radix-ui/react-icons";
import { BiParagraph } from "react-icons/bi";
import { GrOrderedList } from "react-icons/gr";

import ImageUploadModal from "./ImageUploadModel";
import { GoHorizontalRule } from "react-icons/go";
import { BsBlockquoteLeft } from "react-icons/bs";
import { PiCodeBlock } from "react-icons/pi";
function Tiptap({ editor }: { editor: Editor | null }) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");

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
      <div className="flex gap-3 flex-wrap items-center px-2 py-3 dark:bg-background dark:border-border border bg-gray-200 justify-center  rounded-md">
        <button
          onClick={openModal}
          className="dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
        >
          <ImageIcon size={20} />
        </button>

        <ImageUploadModal
          setModalOpen={setModalOpen}
          modalOpen={isModalOpen}
          onImageUpload={(imageUrl) => addImage(imageUrl)}
        />
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md "
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          {editor.isActive("bold") ? (
            <Bold size={20} />
          ) : (
            <BoldIcon size={20} />
          )}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <Italic size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <Strikethrough size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <Code width={20} height={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph")
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <BiParagraph size={20} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <Heading1 size={20} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <Heading2 size={20} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <Heading3 size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <AlignLeft width={20} height={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <AlignCenter width={20} height={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <AlignRight width={20} height={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" })
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <AlignJustify width={20} height={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <ListBulletIcon width={20} height={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <GrOrderedList width={20} height={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <PiCodeBlock width={20} height={20} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "is-active dark:text-gray-200 p-2 transition-all duration-300 max-sm:p-1 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
              : "dark:text-gray-200 p-2 transition-all duration-300 text-gray-600 hover:bg-gray-300 dark:hover:bg-muted  rounded-md"
          }
        >
          <BsBlockquoteLeft width={20} height={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <GoHorizontalRule width={20} height={20} />
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo width={20} height={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo width={20} height={20} />
        </button>
      </div>
      <div className="mt-9">
        <EditorContent editor={editor} />
      </div>
      <div className="flex gap-3 flex-col items-center w-full mt-8"></div>
    </div>
  );
}

export default Tiptap;
