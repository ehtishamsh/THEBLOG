import React from "react";

function GetColor({ tagName }: { tagName: string }) {
  const tagColors: Record<string, string> = {
    Design: "bg-red-100 text-red-700",
    Research: "bg-purple-100 text-purple-700",
    Presentation: "bg-green-100 text-green-700",
    SaaS: "bg-yellow-100 text-yellow-700",
    HTML: "bg-blue-100 text-blue-700",
    CSS: "bg-orange-100 text-orange-700",
  };

  const defaultColors = "bg-gray-100 text-gray-700";

  const classNames = `transition-all duration-400 p-2 rounded-3xl ${
    tagColors[tagName] || defaultColors
  } text-sm font-semibold`;

  return <div className={classNames}>{tagName}</div>;
}

export default GetColor;
