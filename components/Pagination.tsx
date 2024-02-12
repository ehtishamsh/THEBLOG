"use client";
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const data = [1, 2, 3, 4, 5];
function Pagination() {
  const [page, setPage] = React.useState(1);
  const createElement = data.map((item) => {
    return (
      <button
        key={item}
        onClick={() => setPage(item)}
        className={`text-sm font-semibold px-4 py-2 ${
          page === item
            ? "dark:bg-white bg-purple-100 text-purple-800  dark:text-black  rounded-sm"
            : "bg-transparent dark:text-slate-100 text-black "
        }`}
      >
        {item}
      </button>
    );
  });
  return (
    <div className="flex justify-between items-center mt-8 max-sm:flex-col max-sm:gap-8 border-t-2 dark:border-gray-700 border-gray-300 py-6">
      <button
        onClick={() => setPage(page - 1 > 0 ? page - 1 : page)}
        className="flex justify-center items-center gap-3 bg-transparent"
      >
        <ArrowLeft width={20} height={20} />
        <p className="text-sm font-semibold">Previous</p>
      </button>

      <div className="flex justify-center items-center gap-4">
        {createElement}
      </div>
      <button
        onClick={() => setPage(page + 1 < data.length + 1 ? page + 1 : page)}
        className="flex justify-center items-center gap-3 bg-transparent"
      >
        <p className="text-sm font-semibold">Next</p>
        <ArrowRight width={20} height={20} />
      </button>
    </div>
  );
}

export default Pagination;
