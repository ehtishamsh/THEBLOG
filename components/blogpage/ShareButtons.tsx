"use client";
import { Copy, Linkedin } from "lucide-react";
import React, { useState } from "react";
import { BsFacebook, BsTwitterX, BsWhatsapp } from "react-icons/bs";

function ShareButtons() {
  const [isCopied, setIsCopied] = useState(false);
  const wholePath = window.location.href;
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      "Check out this link: " + window.location.href
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  const shareOnTwitter = () => {
    const message = encodeURIComponent(
      "Check out this link: " + window.location.href
    );
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/shareArticle?url=" +
        encodeURIComponent(window.location.href),
      "_blank"
    );
  };
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl mt-3 font-semibold">Share:</h1>
      <div className="flex justify-center gap-2 mb-2 items-center">
        <button
          className="bg-muted p-3 rounded-full"
          onClick={async () => {
            if ("clipboard" in navigator) {
              await navigator.clipboard.writeText(wholePath);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            } else {
              document.execCommand("copy", true, wholePath);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }
          }}
        >
          <Copy width={20} height={20} color="rgb(234 88 12)" />
        </button>
        <button className="bg-muted p-3 rounded-full" onClick={shareOnFacebook}>
          <BsFacebook className="text-xl text-blue-500" />
        </button>
        <button className="bg-muted p-3 rounded-full" onClick={shareOnWhatsApp}>
          <BsWhatsapp className="text-xl text-green-600" />
        </button>
        <button className="bg-muted p-3 rounded-full" onClick={shareOnLinkedIn}>
          <Linkedin className="text-xl text-blue-500" />
        </button>
        <button className="bg-muted p-3 rounded-full" onClick={shareOnTwitter}>
          <BsTwitterX className="text-xl dark:text-white text-black" />
        </button>
      </div>
      <span
        className={`text-green-500 duration-300 text-xs transition-all ${
          isCopied ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        Copied to clipboard
      </span>
    </div>
  );
}

export default ShareButtons;
