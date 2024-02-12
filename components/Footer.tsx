import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex items-center gap-5 py-8 mt-8 max-sm:justify-center max-sm:flex-wrap">
      <p className="text-xl max-sm:text-lg">© 2024</p>
      <Link href={"www.twitter.com"} className="text-xl max-sm:text-lg">
        Twitter
      </Link>
      <Link href={"www.linkedin.com"} className="text-xl max-sm:text-lg">
        LinkedIn
      </Link>
      <Link
        href={"mailto:KkV0D@example.com"}
        className="text-xl max-sm:text-lg"
      >
        Email
      </Link>
    </div>
  );
}

export default Footer;
