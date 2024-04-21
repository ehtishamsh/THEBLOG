"use client";
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

function Pagination({ length, current }: { length: number; current: number }) {
  const [page, setPage] = useState(current || 1);
  const totalPages = Math.ceil(length / 5);
  const router = useRouter();

  const path = usePathname();
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    if (page > 1) {
      router.push(`/home?page=${page - 1 === 0 ? 1 : page - 1}`);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    if (page < totalPages) {
      router.push(
        `/home?page=${page + 1 === totalPages ? totalPages : page + 1}`
      );
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Link
          key={i + 1}
          href={`${path === "/home" ? "/home" : "/home?page=$" + i}`}
        >
          <button
            className={`text-sm font-semibold px-4 py-2 ${
              page === i
                ? "dark:bg-white bg-purple-100 text-purple-800 dark:text-black rounded-sm"
                : "bg-transparent dark:text-slate-100 text-black"
            }`}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        </Link>
      );
    }
    return buttons;
  };
  return (
    <div className="flex justify-between items-center mt-8 max-sm:flex-col max-sm:gap-8 border-t-2 dark:border-gray-700 border-gray-300 py-6">
      <button className="flex justify-center items-center gap-3 bg-transparent">
        <ArrowLeft width={20} height={20} />
        <p className="text-sm font-semibold" onClick={handlePrevPage}>
          Previous
        </p>
      </button>

      <div className="flex justify-center items-center gap-4">
        {renderPaginationButtons()}
      </div>
      <button className="flex justify-center items-center gap-3 bg-transparent">
        <p className="text-sm font-semibold" onClick={handleNextPage}>
          Next
        </p>
        <ArrowRight width={20} height={20} />
      </button>
    </div>
  );
}

export default Pagination;
