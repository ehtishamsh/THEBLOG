import React from "react";
import TagAction from "@/components/adminPage/users/TagAction";

async function UserPage({ id }: { id: string }) {
  const getData = await fetch(
    `https://theblogs-ecru.vercel.app/api/admin/user/getSingle/${id}`,
    {
      method: "GET",
    }
  );
  const data = await getData.json();

  return (
    <div className="px-5 mt-8">
      <TagAction
        emailAdd={data?.user?.email || data?.data?.email}
        name={data?.user?.username || data?.data?.username}
      />
    </div>
  );
}

export default UserPage;
