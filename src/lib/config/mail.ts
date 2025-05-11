import { createTransport } from "nodemailer";

// if (
//   !process.env.EMAIL_SERVER_HOST ||
//   !process.env.EMAIL_SERVER_PORT ||
//   !process.env.EMAIL_SERVER_USER ||
//   !process.env.EMAIL_SERVER_PASSWORD ||
//   !process.env.EMAIL_FROM
// ) {
//   throw new Error("Missing required email configuration environment variables");
// }

export const emailConfig = {
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt("465"),
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
  from: process.env.EMAIL_FROM,
};

export const transport = createTransport(emailConfig.server);

// Verify SMTP connection
// transport.verify((error) => {
//   if (error) {
//     console.error("SMTP connection error:", error);
//   } else {
//     console.log("SMTP connection verified successfully");
//   }
// });

export const generateVerificationToken = () => {
  return crypto.randomUUID();
};

export const normalizeEmail = (email: string): string => {
  let [local, domain] = email.toLowerCase().trim().split("@");
  domain = domain.split(",")[0];
  return `${local}@${domain}`;
};
