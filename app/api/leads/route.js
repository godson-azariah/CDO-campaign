import { after } from "next/server";
import { EMPTY_LEAD, leadSchema } from "@/lib/leadSchema";
import { sendMail } from "@/lib/mailer";
import { confirmationEmail, notificationEmail } from "@/lib/emailTemplates";
import { checkRateLimit, clientIpFrom } from "@/lib/rateLimit";

// Nodemailer needs the Node runtime — it does not run on the edge.
export const runtime = "nodejs";

// A human cannot read and complete this form faster than this.
const MIN_FILL_MS = 3000;

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "Malformed request" },
      { status: 400 },
    );
  }

  // ── Bot traps ───────────────────────────────────────────────
  // Answers with a normal success so a bot learns nothing about why it
  // was dropped, and stops retrying.
  //
  // The response is deliberately indistinguishable from a real one, which
  // makes a false positive impossible to tell apart from a delivered lead.
  // So say so in the log: invisible to the submitter, obvious to us.
  const honeypot =
    typeof payload.companyWebsite === "string" &&
    payload.companyWebsite.trim() !== "";
  const tooFast = Number(payload.elapsedMs) < MIN_FILL_MS;

  if (honeypot || tooFast) {
    console.warn(
      "[leads] dropped as a bot —",
      honeypot ? "honeypot filled" : "",
      tooFast ? `filled in ${payload.elapsedMs}ms, under ${MIN_FILL_MS}ms` : "",
    );
    return Response.json({ ok: true, confirmationSent: false });
  }

  // ── Rate limit ──────────────────────────────────────────────
  // Stops one person hammering submit and flooding the DL.
  if (!checkRateLimit(clientIpFrom(request.headers))) {
    return Response.json(
      {
        ok: false,
        message:
          "Too many requests from this connection, please try again shortly",
      },
      { status: 429 },
    );
  }

  // ── Validation ──────────────────────────────────────────────
  const parsed = leadSchema.safeParse({ ...EMPTY_LEAD, ...payload });

  if (!parsed.success) {
    const errors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return Response.json(
      { ok: false, message: "Please check the highlighted fields", errors },
      { status: 400 },
    );
  }

  const lead = parsed.data;
  const notifyTo = process.env.TEAM_NOTIFICATION_ADDRESS;

  if (!notifyTo) {
    console.error(
      "[leads] TEAM_NOTIFICATION_ADDRESS is not set — refusing the request.",
    );
    return Response.json(
      {
        ok: false,
        message: "The form is not configured yet, please try again later",
      },
      { status: 500 },
    );
  }

  // ── 1. Notify the team. Awaited, and fatal if it fails. ──────
  // With no database this email IS the record of the lead, so a silent
  // failure would lose it outright. Better the visitor resubmits.
  try {
    await sendMail({
      to: notifyTo.split(",").map((address) => address.trim()),
      bcc: process.env.TEAM_NOTIFICATION_BCC,
      // Replying in the DL replies straight to the prospect.
      replyTo: lead.workEmail,
      ...notificationEmail(lead),
    });

    // Pairs with the bot-trap warning above, so every submission leaves a
    // trace: either it was dropped, or it went out and to where.
    console.log("[leads] notification sent to", notifyTo);
  } catch (error) {
    console.error("[leads] notification failed:", error);
    return Response.json(
      {
        ok: false,
        message:
          "We could not submit your request just now, please try again in a moment",
      },
      { status: 502 },
    );
  }

  // ── 2. Confirm to the visitor. Optional, best effort, never fatal. ──
  // The flag is echoed back in the response so the success screen never
  // promises an email that is not coming — the browser needs no copy of
  // this setting.
  const sendConfirmation = process.env.SEND_CONFIRMATION_TO_USER === "true";

  if (sendConfirmation) {
    // Runs after the response is sent, so the success screen is instant.
    // If their address was mistyped this bounces — we already have the lead.
    after(async () => {
      try {
        await sendMail({
          to: lead.workEmail,
          replyTo: process.env.CONFIRMATION_REPLY_TO_ADDRESS,
          ...confirmationEmail(lead),
        });
      } catch (error) {
        console.error(
          "[leads] confirmation to",
          lead.workEmail,
          "failed:",
          error,
        );
      }
    });
  }

  return Response.json({ ok: true, confirmationSent: sendConfirmation });
}
