import { UploadButton } from "@/app/utils/uploadthing";
import React, { useState } from "react";
import { HiXMark } from "react-icons/hi2";

const ImageUploadModal = ({
  onImageUpload,
  setModalOpen,
  modalOpen,
}: {
  onImageUpload: (imageUrl: string) => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUrlSubmit = () => {
    onImageUpload(imageUrl);
    setImageUrl("");
  };

  const closeModal = () => setModalOpen(false);
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
        modalOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="  w-96 max-sm:w-80 p-6 rounded-sm  bg-white border border-black relative">
        <label className="block mb-2 text-black">Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 text-black rounded bg-gray-200"
        />
        <button
          onClick={handleUrlSubmit}
          className="bg-gray-900 text-white px-4 py-2 text-sm rounded hover:bg-gray-800 "
        >
          Add from URL
        </button>

        <label className="block mt-4 mb-2 text-black">
          Upload from Device:
        </label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            onImageUpload(res[0].url);
          }}
        />

        <button
          onClick={closeModal}
          className="absolute p-1 rounded-md top-3 right-3 bg-gray-900 text-white"
        >
          <HiXMark size={15} />
        </button>
      </div>
    </div>
  );
};

export default ImageUploadModal;
