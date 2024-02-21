import Tags from "@/components/adminPage/Tags";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  if (session == null || session.user?.role !== "admin") {
    return redirect("/sign-in");
  } else {
    return <Tags />;
  }
}
export default page;
