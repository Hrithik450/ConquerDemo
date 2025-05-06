"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginWithEmail(email: string) {
  try {
    const result = await signIn("email", {
      email,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred during login" 
    };
  }
} 