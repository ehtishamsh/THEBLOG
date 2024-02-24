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

  const isUUID = (id: string): boolean => {
    // Replace this with your own UUID validation logic
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  };

  const getPathSegments = (): PathSegment[] => {
    const segments = router.split("/").filter(Boolean);

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;

      let name;
      if (index === segments.length - 1) {
        // Check if it's a UUID
        name = isUUID(segment) ? "Edit" : segment;
      } else {
        name = segment.includes("admin") ? "Dashboard" : segment;
      }

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
            {segment.name.slice(0, 1).toUpperCase() + segment.name.slice(1)}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default GetPath;
