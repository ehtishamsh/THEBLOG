"use client";
import React, { useEffect } from "react";

const WarningMessages = {
  TITLE_LENGTH: "Title must be between 10 and 50 characters.",
  DESCRIPTION_LENGTH: "Description must be between 30 and 400 characters.",
  CONTENT_LENGTH:
    "Content must be greater than 300 characters and less than 20000.",
};
const validateLength = (value: string, min: number, max: number): boolean =>
  value?.length >= min && value?.length <= max;

const checkConditions = (
  title: string,
  description: string,
  cont: string
): string => {
  if (!validateLength(cont, 300, 20000)) {
    return WarningMessages.CONTENT_LENGTH;
  } else if (!validateLength(title, 10, 50)) {
    return WarningMessages.TITLE_LENGTH;
  } else if (!validateLength(description, 30, 400)) {
    return WarningMessages.DESCRIPTION_LENGTH;
  }
  return "";
};
interface Tag {
  id: string;
  tagName: string;
}
function ValidateBlog({
  title,
  description,
  cont,
  imgurl,
  selectedTags,
  setValidate,
  validate,
}: {
  title: string;
  description: string;
  cont: string;
  imgurl: string;
  selectedTags: Tag[];
  setValidate: React.Dispatch<React.SetStateAction<boolean>>;
  validate: boolean;
}) {
  const [warningMessage, setWarningM] = React.useState<string>("");
  useEffect(() => {
    const warningMessage = checkConditions(title, description, cont);

    setValidate(!!warningMessage);
    setWarningM(warningMessage);
  }, [selectedTags, title, description, cont, imgurl]);
  return <span className="text-red-500">{validate && warningMessage}</span>;
}

export default ValidateBlog;
