import Dashboard from "@/components/adminPage/Dashboard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return redirect("/sign-in");
  } else if (session.user?.role !== "admin") {
    return redirect("/home");
  } else {
    return (
      <div className="relative">
        <Dashboard />
      </div>
    );
  }
}
export default page;
