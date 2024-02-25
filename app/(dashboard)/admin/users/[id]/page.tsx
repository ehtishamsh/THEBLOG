import TagAction from "@/components/adminPage/tagsid/TagAction";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const getData = await ;
  return (
    <div className="px-5 mt-8">
      <TagAction tag={getData?.data?.tagName} />
    </div>
  );
}

export default page;
