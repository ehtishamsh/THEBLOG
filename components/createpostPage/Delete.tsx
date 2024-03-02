import React from "react";
import { utapi } from "./Uploadimg";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { Trash2 } from "lucide-react";
const Delete = ({
  imgurl,
  setImgurl,
  setHide = () => {},
}: {
  imgurl: string;
  setImgurl: React.Dispatch<React.SetStateAction<any>>;
  setHide: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
}) => {
  const testDelete = async () => {
    const res = await fetch("/api/uploadthing", {
      method: "DELETE",
      body: JSON.stringify({
        url: imgurl,
      }),
    });
    if (res.ok) {
      setImgurl("");
      toast({
        title: "Alert",
        description: "Your image has been removed",
        variant: "default",
      });
      setHide(false);
    } else {
      toast({
        title: "Alert",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        variant={"outline"}
        className={`absolute top-2 right-2 w-10 h-10 p-2 rounded-full ${
          imgurl === "" ? "hidden" : ""
        }`}
        onClick={testDelete}
      >
        <Trash2 className="w-6 h-6" />
      </Button>
    </>
  );
};

export default Delete;
