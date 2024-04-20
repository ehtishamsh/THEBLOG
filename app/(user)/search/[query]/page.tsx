import Search from "@/components/Search/Search";
import React from "react";

async function page({ params }: { params: { query: string } }) {
  return (
    <>
      <Search params={params.query} />
    </>
  );
}

export default page;
