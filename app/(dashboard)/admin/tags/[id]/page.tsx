import TagPage from "@/components/adminPage/TagPage";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  return <TagPage id={params.id} />;
}

export default page;
