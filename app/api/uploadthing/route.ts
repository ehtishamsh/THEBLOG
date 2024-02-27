import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { UTApi } from "uploadthing/server";
import { NextRequest, NextResponse } from "next/server";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const newUrl = data.url.substring(data.url.lastIndexOf("/") + 1);
  const utapi = new UTApi();
  await utapi.deleteFiles(newUrl);

  return NextResponse.json({ message: "ok" });
}
