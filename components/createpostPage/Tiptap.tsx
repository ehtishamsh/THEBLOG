import { Editor, EditorContent } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
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
import TooltipCom from "../utils/TooltipCom";
function Tiptap({ editor }: { editor: Editor | null }) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

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
        <TooltipCom text={"Add Image"}>
          <button onClick={openModal} className="tiptop-button">
            <ImageIcon size={20} />
          </button>
        </TooltipCom>

        <ImageUploadModal
          setModalOpen={setModalOpen}
          modalOpen={isModalOpen}
          onImageUpload={(imageUrl) => addImage(imageUrl)}
        />

        <TooltipCom text={"Bold"}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold")
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <BoldIcon size={20} />
          </button>
        </TooltipCom>

        <TooltipCom text={"Italic"}>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic")
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <Italic size={20} />
          </button>
        </TooltipCom>

        <TooltipCom text={"Strikethrough"}>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={
              editor.isActive("strike")
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <Strikethrough size={20} />
          </button>
        </TooltipCom>

        <TooltipCom text={"Code"}>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={
              editor.isActive("code")
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <Code width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text={"Paragraph"}>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={
              editor.isActive("paragraph")
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <BiParagraph size={20} />
          </button>
        </TooltipCom>

        <TooltipCom text={"Heading h1"}>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 })
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <Heading1 size={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Heading 2">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 })
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <Heading2 size={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Heading 3">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 })
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <Heading3 size={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Align Left">
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" })
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <AlignLeft width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Align Center">
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" })
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <AlignCenter width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Align Right">
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" })
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <AlignRight width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Align Justify">
          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" })
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <AlignJustify width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Bullet List">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList")
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <ListBulletIcon width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Ordered List">
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList")
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <GrOrderedList width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Code Block">
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={
              editor.isActive("codeBlock")
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <PiCodeBlock width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Blockquote">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={
              editor.isActive("blockquote")
                ? "is-active tiptop-button"
                : "tiptop-button"
            }
          >
            <BsBlockquoteLeft width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Horizontal Rule">
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <GoHorizontalRule width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Undo">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Redo">
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo width={20} height={20} />
          </button>
        </TooltipCom>
      </div>
      <div className="mt-9">
        <EditorContent editor={editor} />
      </div>
      <div className="flex gap-3 flex-col items-center w-full mt-8"></div>
    </div>
  );
}

export default Tiptap;
