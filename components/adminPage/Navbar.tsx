import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserNav } from "./User-nav";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-16 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href={"/admin"}>THE BLOG</Link>
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
