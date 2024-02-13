"use client";
import { Image, Plus, Upload, Video, VideoIcon } from "lucide-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const handlePlus = (e: React.MouseEvent): void => {
    e.preventDefault();
    const imageButtons = document.querySelector<HTMLElement>(".image_menu");
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="px-2 py-6 mt-7">
      <div className="max-w-7xl mx-auto">
        <form action="">
          <input
            type="text"
            className=" outline-none p-2 bg-transparent text-4xl mb-5"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div className="flex items-center relative">
            <button
              onClick={(e) => handlePlus(e)}
              className="bg-transparent border border-gray-500 rounded-full p-2"
            >
              <Plus width={20} height={20} />
            </button>
            <div
              className={`${
                showMenu
                  ? "opacity-100  [visibility:visible]"
                  : "opacity-0 [visibility:hidden]"
              }  transition-all duration-300`}
            >
              <div className="flex gap-4 items-center absolute top-0 left-14">
                <button
                  onClick={(e) => handlePlus(e)}
                  className="bg-transparent border border-green-600 rounded-full p-2"
                >
                  <Image width={20} height={20} className="text-green-600" />
                </button>
                <button
                  onClick={(e) => handlePlus(e)}
                  className="bg-transparent border border-green-600 rounded-full p-2"
                >
                  <Upload width={20} height={20} className="text-green-600" />
                </button>
                <button
                  onClick={(e) => handlePlus(e)}
                  className="bg-transparent border border-green-600 rounded-full p-2"
                >
                  <VideoIcon
                    width={20}
                    height={20}
                    className="text-green-600"
                  />
                </button>
              </div>
            </div>
          </div>
          <ReactQuill
            placeholder="write something"
            theme="bubble"
            onChange={setValue}
            value={value}
          />
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
