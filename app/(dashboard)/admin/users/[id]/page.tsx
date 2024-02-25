import TagAction from "@/components/adminPage/users/TagAction";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const getData = await fetch(
    `http://localhost:3000/api/admin/user/getSingle/${params.id}`,
    {
      method: "GET",
    }
  );
  const data = await getData.json();
  console.log(data);
  return (
    <div className="px-5 mt-8">
      <TagAction
        emailAdd={data?.user?.email || data?.data?.email}
        name={data?.user?.username || data?.data?.username}
      />
    </div>
  );
}

export default page;
