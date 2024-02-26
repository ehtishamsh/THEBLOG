"use client";

import React, { useState, ChangeEvent } from "react";
import CBColor from "../utils/CBColor";

interface Tag {
  id: string;
  tagName: string;
}

const Multiselect: React.FC<{
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  tags: Tag[];
}> = ({ selectedTags, setSelectedTags, tags }) => {
  const [tagInput, setTagInput] = useState<string>("");
  const [tagSuggestions, setTagSuggestions] = useState<Tag[]>([]);

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTagInput(input);

    // Filter demo tags based on input
    const suggestions = tags.filter((tag) =>
      tag.tagName.toLowerCase().includes(input.toLowerCase())
    );
    setTagSuggestions(suggestions);
  };

  const handleAddTag = (tag: Tag) => {
    if (!selectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
      setTagInput("");
      setTagSuggestions([]);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <label
        htmlFor="tags"
        className="block mb-2 text-3xl dark:text-placeholder-default italic ml-1"
      >
        Select Tags...
      </label>
      <div className="relative">
        <input
          type="text"
          value={tagInput}
          onChange={handleTagInputChange}
          placeholder="Type to add tags"
          className="w-[28rem] max-sm:w-[20rem] px-4 py-2 border placeholder:text-placeholder-default dark:border-border transition-all duration-300 dark:bg-background bg-white border-gray-400 rounded focus:outline-gray-500 dark:focus:outline-white"
        />

        {tagSuggestions.length > 0 && (
          <ul className="absolute z-10 w-[28rem] max-sm:w-[20rem] mt-2 bg-white border-border dark:bg-background border dark:border-border rounded">
            {tagSuggestions.map((tag) => (
              <li
                key={tag.id}
                onClick={() => handleAddTag(tag)}
                className="px-4 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-muted transition-all duration-300"
              >
                {tag.tagName}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-wrap">
        {selectedTags.map((tag) => (
          <div key={tag.id} className="flex items-center mr-2 mt-2">
            <CBColor
              tag={tag}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Multiselect;
