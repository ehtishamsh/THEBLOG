"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
import { animate, motion } from "framer-motion";

function NavbarDashBoard() {
  const [open, setOpen] = useState<boolean>(false);
  const path = usePathname();

  return (
    <>
      <div className="hidden max-sm:block">
        <Button
          variant="outline"
          className={`p-1 ${open ? "z-[9999] absolute top-8 left-5" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.div>
            {open ? (
              <motion.span>
                <X width={25} height={25} />
              </motion.span>
            ) : (
              <HamburgerMenuIcon width={25} height={25} />
            )}
          </motion.div>
        </Button>
        {open ? (
          <motion.div
            variants={{
              hidden: { x: "100%", opacity: 0, transition: { duration: 0.2 } },
              visible: {
                x: "0%",
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
            initial="hidden"
            animate={open ? "visible" : "hidden"}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
            className={`${
              open ? "visible" : "invisible"
            } text-white w-[65vw] h-screen bg-background border border-border absolute top-0 left-0 z-50`}
          >
            <div className="w-full h-full relative">fdfddfdf</div>
          </motion.div>
        ) : null}
      </div>
    </>
  );
}

export default NavbarDashBoard;
