import React from "react";
import SearchBlogs from "./SearchBlogs";

async function Search({ params }: { params: string }) {
  return (
    <div className="max-w-7xl w-full px-2  mx-auto">
      <h1 className="mt-8 text-3xl font-bold">Search Term : {params}</h1>
      <h1 className="text-xl font-semibold mt-4">Results:</h1>
      <SearchBlogs search={params} />
    </div>
  );
}

export default Search;
