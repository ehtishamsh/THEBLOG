import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    role: string; // Include the role field
  }

  interface Session {
    user: User & { username: string; role: string };
    token: { username: string; role: string }; // Include the role field
  }
}
