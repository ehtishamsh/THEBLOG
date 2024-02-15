import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import React from "react";

function TooltipCom({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>
            <p className="text-sm transition-all duration-500 -translate-y-5 shadow-md  font-semibold dark:text-gray-200 text-gray-600 bg-background border border-border px-3 py-2 rounded-md">
              {text}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

export default TooltipCom;
