import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="px-2">
      <div className="max-w-7xl mx-auto flex items-center gap-5 py-8 mt-8 justify-between max-sm:flex-wrap">
        <p className="text-xl max-sm:text-lg">Made with ❤️ by Ehtisham.</p>
        <div className="flex items-center gap-5 self-end">
          <Link
            href={"https://github.com/ehtishamsh"}
            target="_blank"
            className="text-xl max-sm:text-lg"
          >
            Github
          </Link>
          <Link
            href={"https://www.linkedin.com/in/ehtishamshah/"}
            className="text-xl max-sm:text-lg"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
