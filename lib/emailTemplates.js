/**
 * HTML email templates.
 *
 * Deliberately old-fashioned: nested tables, inline styles, no web fonts, no
 * background images. Outlook strips most modern CSS, and Gmail's spam scoring
 * dislikes image-heavy mail — so this is text-led with a healthy text-to-markup
 * ratio and a real plain-text alternative for every message, which is one of
 * the cheapest things you can do to stay out of the spam folder.
 */

const VIOLET = "#4a12b8";
const GREEN = "#0f9d58";
const HEADING = "#1d0f2a";
const BODY = "#3f3a4a";
const MUTED = "#6b6080";
const LINE = "#e6ddf7";
const TINT = "#faf7ff";
const FONT = "Helvetica, Arial, sans-serif";
const LOGO_CID = "ignitho-logo";

/** Never interpolate submitted values into HTML without this. */
function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell({ preheader, eyebrow, heading, bodyHtml, footerHtml }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>${esc(heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f2eefb;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#f2eefb;">${esc(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2eefb" style="background-color:#f2eefb;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border:1px solid ${LINE};border-radius:12px;overflow:hidden;font-family:${FONT};">

          <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;padding:22px 30px 20px 30px;border-bottom:3px solid ${VIOLET};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;"><img src="cid:${LOGO_CID}" width="128" alt="Ignitho" style="display:block;width:128px;max-width:128px;height:auto;border:0;outline:none;text-decoration:none;" /></td>
                  <td align="right" style="font-family:${FONT};font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${VIOLET};vertical-align:middle;">${esc(eyebrow)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 30px 30px 30px;">
              <h1 style="margin:0 0 6px 0;font-family:${FONT};font-size:22px;line-height:30px;font-weight:bold;color:${HEADING};">${esc(heading)}</h1>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px 0;">
                <tr><td bgcolor="${GREEN}" style="background-color:${GREEN};height:3px;width:44px;line-height:3px;font-size:3px;">&nbsp;</td></tr>
              </table>
              ${bodyHtml}
            </td>
          </tr>

          <tr>
            <td bgcolor="${TINT}" style="background-color:${TINT};border-top:1px solid ${LINE};padding:18px 30px;">
              ${footerHtml}
            </td>
          </tr>

        </table>

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
          <tr>
            <td align="center" style="padding:16px 10px 0 10px;font-family:${FONT};font-size:11px;line-height:17px;color:#8b83a3;">
              Ignitho &middot; Data, Analytics &amp; AI for the enterprise<br />
              <a href="https://www.ignitho.com" style="color:${VIOLET};text-decoration:none;">www.ignitho.com</a>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Label/value rows with a hairline between them. */
function rows(pairs) {
  return pairs
    .filter(([, value]) => value)
    .map(
      ([label, value], index) => `
      <tr>
        <td style="padding:11px 0 11px 0;${index ? `border-top:1px solid ${LINE};` : ""}font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};width:150px;vertical-align:top;">${esc(label)}</td>
        <td style="padding:11px 0 11px 0;${index ? `border-top:1px solid ${LINE};` : ""}font-family:${FONT};font-size:14px;line-height:21px;font-weight:bold;color:${HEADING};vertical-align:top;">${value}</td>
      </tr>`,
    )
    .join("");
}

function sectionTitle(text) {
  return `<p style="margin:26px 0 4px 0;font-family:${FONT};font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:${VIOLET};">${esc(text)}</p>`;
}

/* ── 1. Notification, to the internal distribution list ─────── */

export function notificationEmail(lead) {
  const name = `${lead.firstName} ${lead.lastName}`;

  const bodyHtml = `
    <p style="margin:0 0 22px 0;font-family:${FONT};font-size:15px;line-height:24px;color:${BODY};">
      <strong style="color:${HEADING};">${esc(name)}</strong> from
      <strong style="color:${HEADING};">${esc(lead.company)}</strong> asked for a
      30-minute conversation via the CDO campaign page.
    </p>


    ${sectionTitle("Contact")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${rows([
        ["Name", esc(name)],
        [
          "Work email",
          `<a href="mailto:${esc(lead.workEmail)}" style="color:${VIOLET};text-decoration:none;">${esc(lead.workEmail)}</a>`,
        ],
        [
          "Phone",
          `<a href="tel:${esc(lead.phone.replace(/[^\d+]/g, ""))}" style="color:${VIOLET};text-decoration:none;">${esc(lead.phone)}</a>`,
        ],
        ["Job title", esc(lead.jobTitle)],
        ["Company", esc(lead.company)],
      ])}
    </table>

    ${sectionTitle("Location")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${rows([
        ["Address", esc(lead.address).replace(/\n/g, "<br />")],
        ["City", esc(lead.city)],
        ["State / province", esc(lead.state)],
        ["ZIP / postal code", esc(lead.zip)],
        ["Country", esc(lead.country)],
      ])}
    </table>

    ${
      lead.additionalInfo
        ? `${sectionTitle("What they told us")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;border-left:3px solid ${GREEN};">
      <tr>
        <td style="padding:4px 0 4px 14px;font-family:${FONT};font-size:14px;line-height:23px;color:${BODY};">${esc(lead.additionalInfo).replace(/\n/g, "<br />")}</td>
      </tr>
    </table>`
        : ""
    }`;

  const footerHtml = `<p style="margin:0;font-family:${FONT};font-size:13px;line-height:20px;color:${BODY};">
      <strong style="color:${HEADING};">Reply to this email</strong> and it goes straight to
      ${esc(lead.firstName)} at ${esc(lead.workEmail)}.
    </p>`;

  const text = [
    `New conversation request`,
    ``,
    `${name} from ${lead.company} asked for a 30-minute conversation via the CDO campaign page.`,
    ``,
    `CONTACT`,
    `Name:       ${name}`,
    `Work email: ${lead.workEmail}`,
    `Phone:      ${lead.phone}`,
    `Job title:  ${lead.jobTitle}`,
    `Company:    ${lead.company}`,
    ``,
    `LOCATION`,
    `Address:    ${lead.address}`,
    `City:       ${lead.city}`,
    `State:      ${lead.state}`,
    `ZIP:        ${lead.zip}`,
    `Country:    ${lead.country}`,
    lead.additionalInfo ? `\nWHAT THEY TOLD US\n${lead.additionalInfo}` : "",
    ``,
    `Reply to this email to reach ${lead.firstName} directly.`,
  ].join("\n");

  return {
    subject: `New conversation request — ${name}, ${lead.company}`,
    html: shell({
      preheader: `${lead.jobTitle}, ${lead.company} · ${lead.city}, ${lead.country}`,
      eyebrow: "CDO campaign",
      heading: "New conversation request",
      bodyHtml,
      footerHtml,
    }),
    text,
  };
}

/* ── 2. Confirmation, to the person who submitted ───────────── */

export function confirmationEmail(lead) {
  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-family:${FONT};font-size:15px;line-height:25px;color:${BODY};">
      Hi ${esc(lead.firstName)},
    </p>
    <p style="margin:0 0 22px 0;font-family:${FONT};font-size:15px;line-height:25px;color:${BODY};">
      Thank you for asking for a conversation about Frugal Innovation. We have
      your details.
    </p>


    <p style="margin:0 0 16px 0;font-family:${FONT};font-size:15px;line-height:25px;color:${BODY};">
      Roney Solomon will be in touch by email within one business day to arrange
      a time that suits you. If anything changes in the meantime, just reply to
      this message.
    </p>
    <p style="margin:0;font-family:${FONT};font-size:15px;line-height:25px;color:${BODY};">
      Kind regards,<br /><strong style="color:${HEADING};">The Ignitho Team</strong>
    </p>`;

  const footerHtml = `<p style="margin:0;font-family:${FONT};font-size:12px;line-height:19px;color:${MUTED};">
      You are receiving this because you asked for a conversation on the Ignitho
      website. No further email will be sent unless we are arranging your call.
    </p>`;

  const text = `Hi ${lead.firstName},

Thank you for asking for a conversation about Frugal Innovation. We have your details.

Roney Solomon will be in touch by email within one business day to arrange a time that suits you. If anything changes in the meantime, just reply to this message.

Kind regards,
The Ignitho Team
www.ignitho.com`;

  return {
    subject: "We have your request — Ignitho",
    html: shell({
      preheader: `We will be in touch within one business day to arrange a time.`,
      eyebrow: "Confirmation",
      heading: "Your conversation request has been received",
      bodyHtml,
      footerHtml,
    }),
    text,
  };
}
