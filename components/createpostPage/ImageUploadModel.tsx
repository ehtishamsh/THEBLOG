import React, { useState } from "react";
import { HiXMark } from "react-icons/hi2";

const ImageUploadModal = ({
  onImageUpload,
  setModalOpen,
}: {
  onImageUpload: (imageUrl: string) => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUrlSubmit = () => {
    onImageUpload(imageUrl);
    setImageUrl("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
    }
  };
  const closeModal = () => setModalOpen(false);
  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="  w-96 p-6 rounded-sm  bg-white border border-black relative">
        <label className="block mb-2">Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleUrlSubmit}
          className="bg-gray-900 text-white px-4 py-2 text-sm rounded hover:bg-gray-800"
        >
          Add from URL
        </button>

        <label className="block mt-4 mb-2">Upload from Device:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="file:bg-gray-900 file:text-white file:px-5 file:border-none file:py-2 file:text-sm file:rounded file:hover:bg-gray-800"
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
