import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";
type User =
  | {
      id: string;
      email: string;
      username: string;
      password: string;
      role: string;
      image: string;
      createdAt: Date;
      updatedAt: Date;
      error?: string;
    }
  | any;
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await db?.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!existingUser) {
          return null;
        }
        const password = await compare(
          credentials.password,
          existingUser.password
        );
        if (!password) {
          return null;
        }
        if (existingUser.emailVerified === false) {
          throw new Error("unverified");
        }
        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
          role: existingUser.role,
          image: existingUser.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        // Check if there's a user object
        if (typeof user === "string") {
          // Check if it's an error message (string)
          // Handle the custom error here (user as string)
          throw new Error(user);
        } else {
          // User object without error
          return true;
        }
      }
      return true; // No user object (successful sign-in)
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        return {
          ...token,
          picture: session?.image || token?.picture,
          username: session?.username || token?.username,
        };
      }

      if (user) {
        return {
          ...token,
          username: user.username,
          role: user.role,
          picture: user.image,
        };
      }
      const updateData: User = await db?.user.update({
        where: {
          email: token.email as string,
        },
        data: {
          image: token.picture as string,
          username: token.username as string,
        },
      });

      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          role: token.role,
          image: token.picture,
        },
      };
      return session;
    },
  },
};
