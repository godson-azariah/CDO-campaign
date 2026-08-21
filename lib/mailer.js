import nodemailer from "nodemailer";
import { LOGO_ATTACHMENT } from "./logoAsset";

/**
 * Server-only SMTP transport.
 *
 * Defaults to SendGrid, so the only secret anyone needs to supply is the API
 * key. Set SMTP_HOST / SMTP_PORT / SMTP_USERNAME to point at a different
 * provider — Nodemailer speaks plain SMTP, so no code changes are needed.
 */
const SENDGRID = {
  host: "smtp.sendgrid.net",
  port: 587,
  username: "apikey", // SendGrid's literal username, not an email address
};

let transporter = null;

function getPassword() {
  const password = process.env.SENDGRID_API_KEY || process.env.SMTP_PASSWORD;

  if (!password) {
    throw new Error(
      "Missing SENDGRID_API_KEY — open .env.local, paste it in, and restart the dev server.",
    );
  }

  return password;
}

export function getTransport() {
  if (transporter) return transporter;

  const port = Number(process.env.SMTP_PORT || SENDGRID.port);

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || SENDGRID.host,
    port,
    // 587 uses STARTTLS (secure:false); 465 is implicit TLS (secure:true).
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USERNAME || SENDGRID.username,
      pass: getPassword(),
    },
  });

  return transporter;
}

/** Retries transient SMTP failures — most provider blips last seconds. */
async function withRetry(fn, attempts = 3) {
  let lastError;

  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 400 * (i + 1)));
      }
    }
  }

  throw lastError;
}

export async function sendMail({ to, subject, html, text, replyTo, bcc }) {
  const from = process.env.EMAIL_FROM_ADDRESS;

  if (!from) {
    throw new Error("Missing EMAIL_FROM_ADDRESS — see .env.local.");
  }

  return withRetry(() =>
    getTransport().sendMail({
      from,
      to,
      bcc: bcc || undefined,
      replyTo: replyTo || undefined,
      subject,
      html,
      text,
      attachments: [LOGO_ATTACHMENT],
    }),
  );
}
