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
  List,
  ListIcon,
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
import Link from "./Ext/Link";
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
    <div className="relative">
      <div className="flex gap-3 flex-wrap items-center px-2 sticky z-50  top-0 left-0 py-3 dark:bg-background dark:border-border border bg-gray-200 justify-center  rounded-md">
        <TooltipCom text={"Add Image"}>
          <button type="button" onClick={openModal} className="tiptop-button">
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
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
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
        <TooltipCom text="Sink Bullet List">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().sinkListItem("listItem").run()
            }
            disabled={!editor.can().sinkListItem("listItem")}
            className="tiptop-button cursor-pointer"
          >
            <ListIcon width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Ordered List">
          <button
            type="button"
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
        <TooltipCom text="Sink List">
          <button
            type="button"
            className="tiptop-button cursor-pointer"
            onClick={() =>
              editor.chain().focus().sinkListItem("listItem").run()
            }
            disabled={!editor.can().sinkListItem("listItem")}
          >
            <List width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Code Block">
          <button
            type="button"
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
            type="button"
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
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <GoHorizontalRule width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Undo">
          <button
            type="button"
            className="cursor-pointer tiptop-button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo width={20} height={20} />
          </button>
        </TooltipCom>

        <TooltipCom text="Redo">
          <button
            type="button"
            className="cursor-pointer tiptap-button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo width={20} height={20} />
          </button>
        </TooltipCom>
        <Link editor={editor} />
      </div>
      <div className="mt-9">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default Tiptap;
