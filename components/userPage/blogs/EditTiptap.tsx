"use client";
import { Editor, useEditor } from "@tiptap/react";
import React, { useEffect } from "react";
import { extensions } from "./Ext";
import Tiptap from "@/components/createpostPage/Tiptap";

function EditTiptap({
  cont,
  setCont,
}: {
  cont: string;
  setCont: React.Dispatch<React.SetStateAction<string>>;
}) {
  const editor: Editor | null = useEditor({
    extensions,
    content: cont as string,
  });
  useEffect(() => {
    setTimeout(() => {
      setCont(editor?.getHTML() as string);
    }, 2000);
  }, [editor?.getHTML()]);
  return (
    <>
      <Tiptap editor={editor} />
    </>
  );
}

export default EditTiptap;
