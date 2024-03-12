import React from "react";
import TagAction from "./tagsid/TagAction";

async function TagPage({ id }: { id: string }) {
  const data = await fetch(
    `https://theblogs-ecru.vercel.app/api/admin/tag/${id}`,
    {
      method: "GET",
    }
  );
  const data1 = await data.json();
  return (
    <div className="px-5 mt-8">
      <TagAction tag={data1.tag.tagName} />
    </div>
  );
}

export default TagPage;
