import type { NextAuthConfig } from "next-auth";
import type { User } from "next-auth";
import { users } from "../db/schema";

declare module "next-auth" {
  interface User {
    userId: string;
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/a/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/a/dashboard", nextUrl));
      }
      return true;
    },
  
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId as string;
      }
      return session;
    },
  },
  providers: [], // We'll add providers in the main auth file
} satisfies NextAuthConfig; 