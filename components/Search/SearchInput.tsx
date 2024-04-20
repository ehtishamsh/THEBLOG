"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

function SearchInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    });
    if (searchTerm.length > 3) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          router.push(`/search/${searchTerm}`);
        }
      });
    }
  }, []);
  const handleOpenClose = () => {
    if (searchTerm.length > 3) {
      router.push(`/search/${searchTerm}`);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (width < 600) {
      setIsOpen(true);
    }
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  console.log(width);
  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  const inputVariants = {
    open: { width: "250px", opacity: 1 },
    closed: { width: 0, opacity: 0 },
  };

  return (
    <div className="flex items-center gap-2 max-sm:gap-1">
      <motion.div
        className={"overflow-hidden p-1 max-sm:!w-full"}
        animate={isOpen ? "open" : "closed"}
        variants={inputVariants}
      >
        <div className="relative">
          <Input
            placeholder="Search"
            type="search"
            value={searchTerm} // Clear input on close (optional)
            onChange={(e) => setSearchTerm(e.target.value)} // Open on input change
            className={`transition-all duration-300 `}
          />
        </div>
      </motion.div>
      <Button
        variant={"outline"}
        className={`px-2
         py-1 max-sm:px-1 transition-all duration-300`}
        onClick={handleOpenClose}
      >
        <motion.span variants={iconVariants}>
          {isOpen ? (
            searchTerm.length < 3 ? (
              <X className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
            ) : (
              <Search className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
            )
          ) : (
            <Search className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
          )}
        </motion.span>
      </Button>
    </div>
  );
}

export default SearchInput;
