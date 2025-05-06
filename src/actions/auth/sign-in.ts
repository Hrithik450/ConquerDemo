"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signInAction() {
  try {
    const result = await signIn("email", {
      redirect: false,
      callbackUrl: "/a/dashboard",
    });

    if (result?.error) {
      if (result.error.includes("expired") || result.error.includes("used")) {
        return {
          success: false,
          error: "The sign-in link has expired or has already been used. Please request a new one.",
        };
      }
      if (result.error === "Configuration") {
        console.error("Auth configuration error:", result.error);
        return {
          success: false,
          error: "There is a problem with the server configuration. Please try again later.",
        };
      }
      return {
        success: false,
        error: result.error,
      };
    }

    if (result?.url) {
      redirect(result.url);
    }

    return { success: true };
  } catch (error) {
    console.error("Error during sign in:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
} 