import TagAction from "@/components/adminPage/users/TagAction";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const getData = await fetch(
    `http://localhost:3000/api/admin/user/${params.id}`,
    {
      method: "GET",
    }
  );
  const data = await getData.json();
  return (
    <div className="px-5 mt-8">
      <TagAction emailAdd={data?.data?.email} name={data?.data?.username} />
    </div>
  );
}

export default page;
