"use client";
import TooltipCom from "@/components/utils/TooltipCom";
import { Editor } from "@tiptap/react";
import { Link2, Unlink } from "lucide-react";
import React, { useCallback } from "react";

function Link({ editor }: { editor: Editor | null }) {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <TooltipCom text="Add Link">
        <button
          type="button"
          onClick={setLink}
          className={editor?.isActive("link") ? "is-active" : ""}
        >
          <Link2 size={20} />
        </button>
      </TooltipCom>
      <TooltipCom text="Remove Link">
        <button
          onClick={() => editor?.chain().focus().unsetLink().run()}
          disabled={!editor?.isActive("link")}
        >
          <Unlink size={20} />
        </button>
      </TooltipCom>
    </>
  );
}

export default Link;
