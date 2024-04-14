import Verfiy from "@/components/verifyPage/Verfiy";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  return (
    <>
      <Verfiy tokken={params.id} />
    </>
  );
}

export default page;
