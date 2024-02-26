"use client";
import { UploadButton, UploadDropzone } from "@/app/utils/uploadthing";
import React from "react";

function Uploadimg({ setImage }: { setImage: any }) {
  return (
    <>
      <UploadDropzone endpoint="imageUploader" />
    </>
  );
}

export default Uploadimg;
