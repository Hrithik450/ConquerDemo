import NextAuth from "next-auth";
import { authConfig } from "./config";
import { db } from "@/lib/db";
import EmailProvider from "next-auth/providers/email";
import { emailConfig, transport, generateVerificationToken, normalizeEmail } from "@/lib/config/mail";
import { html, text } from "@/lib/utils/email-templates";
import { adapter } from "./adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter,
  ...authConfig,
  providers: [
    EmailProvider({
      server: emailConfig.server,
      from: emailConfig.from,
      generateVerificationToken,
      normalizeIdentifier: normalizeEmail,
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const { host } = new URL(url);
        const result = await transport.sendMail({
          to: email,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
});
