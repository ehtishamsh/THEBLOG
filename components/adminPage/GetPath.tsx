"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface PathSegment {
  name: string;
  path: string;
}

const GetPath: React.FC = () => {
  const router = usePathname();

  const getPathSegments = (): PathSegment[] => {
    const segments = router.split("/").filter(Boolean);

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      const name =
        index === segments.length - 1 && /^\d+$/.test(segment)
          ? "Edit"
          : segment.includes("admin")
          ? "Dashboard"
          : segment.slice(0, 1).toUpperCase() + segment.slice(1);

      return { name, path };
    });
  };

  return (
    <div className="flex items-center">
      {getPathSegments().map((segment, index) => (
        <span key={index} className="text-sm flex items-center">
          {index > 0 && (
            <span className="mx-1 text-muted-foreground flex items-center">
              <ChevronRight width={16} height={16} />
            </span>
          )}
          <Link
            href={segment.path}
            className={
              index === getPathSegments().length - 1
                ? "text-white"
                : "text-muted-foreground"
            }
          >
            {segment.name}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default GetPath;
