"use client";
import parse from "html-react-parser";
import Image from "next/image";
import React from "react";

function GetContent({ content }: { content: string }) {
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img" && domNode.attribs && domNode.attribs.src) {
        const { src, alt, width, height } = domNode.attribs;
        return (
          <Image
            src={src}
            alt={"image demo"}
            layout="responsive"
            width={1152}
            height={576}
            className="rounded-sm object-cover"
          />
        );
      }
    },
  };
  return <>{parse(content, options)}</>;
}
export default GetContent;
