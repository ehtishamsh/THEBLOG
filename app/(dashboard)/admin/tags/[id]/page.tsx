import TagAction from "@/components/adminPage/tagsid/TagAction";
import { db } from "@/lib/db";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const data = await fetch(`/api/admin/tag/${params.id}`, {
    method: "GET",
  });
  const data1 = await data.json();
  return (
    <div className="px-5 mt-8">
      <TagAction tag={data1.tag.tagName} />
    </div>
  );
}

export default page;
