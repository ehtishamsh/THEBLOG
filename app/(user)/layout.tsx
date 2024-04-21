import Footer from "@/components/Footer";
import NavbarContainer from "@/components/NavbarContainer";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarContainer />
      <main className="mt-28">{children}</main>
      <Footer />
    </>
  );
}
