import UserPage from "@/components/adminPage/userPage";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  return (
    <>
      <UserPage id={params.id} />
    </>
  );
}

export default page;
