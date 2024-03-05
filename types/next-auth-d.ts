import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    role: string; // Include the role field
    image?: string;
  }

  interface Session {
    user: User & { username: string; role: string; image?: string };
    token: { username: string; role: string; image?: string }; // Include the role field
  }
}
