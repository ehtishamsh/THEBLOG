import React from "react";

interface Tag {
  id: number;
  name: string;
}
function CBColor({
  tag,
  selectedTags,
  setSelectedTags,
}: {
  tag: Tag;
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}) {
  const tagColors: Record<string, string> = {
    Design: "bg-red-100 text-red-700",
    Research: "bg-purple-100 text-purple-700",
    Presentation: "bg-green-100 text-green-700",
    SaaS: "bg-yellow-100 text-yellow-700",
  };
  const handleRemoveTag = (tagToRemove: Tag) => {
    const updatedTags = selectedTags.filter(
      (tag: Tag) => tag.id !== tagToRemove.id
    );
    setSelectedTags(updatedTags);
  };
  const defaultColors = "bg-gray-100 text-gray-700";

  const classNames = `transition-all duration-400 p-2 rounded-3xl ${
    tagColors[tag.name] || defaultColors
  } text-sm font-semibold`;

  return (
    <div className={classNames}>
      {tag.name}
      <button
        onClick={() => handleRemoveTag(tag)}
        className="ml-2 focus:outline-none"
      >
        X
      </button>
    </div>
  );
}

export default CBColor;
