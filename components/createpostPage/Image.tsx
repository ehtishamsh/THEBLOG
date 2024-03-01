import Image from "@tiptap/extension-image";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Check } from "lucide-react";
import { BsExclamation, BsExclamationCircle } from "react-icons/bs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
function ImageNode(props: any) {
  const { src, alt } = props.node.attrs;
  const { updateAttributes } = props;
  const [modal, setModal] = useState(false);
  const [altText, setAltText] = useState(alt);

  function handleSubmit(e: any) {
    e.preventDefault();
    updateAttributes({ alt: altText });
    setModal(false);
  }
  let className = "";
  if (props.selected) {
    className += " ProseMirror-selectednode";
  }

  return (
    <>
      <NodeViewWrapper className={className} data-drag-handle>
        <img src={src} alt={alt} className="object-cover h-[400px] w-full" />
        <span className="flex justify-center items-center mt-5 flex-col gap-4">
          <span className="flex justify-center items-center gap-4  bg-[#ffffff14]   rounded-md backdrop-blur-lg px-2 py-1 text-muted-foreground">
            {alt ? (
              <span>
                <Check width={24} height={24} className="text-green-500" />
              </span>
            ) : (
              <span className="text-xl">
                <BsExclamationCircle size={24} className="text-red-500" />
              </span>
            )}

            {alt ? (
              <span className="font-semibold">{alt}</span>
            ) : (
              <span className="text">Alt text missing.</span>
            )}
            <Button
              className="text-xs"
              variant={"outline"}
              type="button"
              onClick={() => setModal(true)}
            >
              {alt ? "Edit" : "Add"}
            </Button>
          </span>
        </span>
      </NodeViewWrapper>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ${
          modal ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="bg-background border border-border p-8 rounded-lg">
          <Input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Enter alt text"
            className="mb-4"
            autoFocus
          />
          <div className="flex justify-center items-center gap-5">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setModal(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              className="text-xs"
              variant={"outline"}
              type="button"
              onClick={(e) => handleSubmit(e)}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },
});
