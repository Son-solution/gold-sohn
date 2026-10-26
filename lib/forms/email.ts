import "server-only";
import { site, siteUrl } from "@/lib/site";

/**
 * HTML e-mail templates. Table layout and inline styles only – mail clients ignore
 * stylesheets, flexbox and web fonts. Colours follow the site tokens.
 */
const c = {
  page: "#F6F1E8",
  card: "#FFFFFF",
  line: "#E6E3DF",
  gold: "#C5A064",
  goldInk: "#6E5226",
  ink: "#333333",
  inkStrong: "#2B2825",
  ink2: "#4A453F",
};

const sans = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const serif = "Georgia,'Times New Roman',serif";

export function esc(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
}

interface LayoutOptions {
  preheader: string;
  eyebrow: string;
  title: string;
  body: string;
}

/** Shared frame: logo on cream, white card with a gold top edge, company footer. */
function layout({ preheader, eyebrow, title, body }: LayoutOptions): string {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${c.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.page};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
<tr><td style="padding:8px 8px 28px;">
<a href="${siteUrl}/" style="text-decoration:none;"><img src="${siteUrl}/brand/logo-gold-sohn.png" width="210" alt="${site.name}" style="display:block;width:210px;max-width:100%;height:auto;border:0;"></a>
</td></tr>
<tr><td style="background:${c.card};border-radius:20px;border-top:5px solid ${c.gold};box-shadow:0 1px 0 ${c.line};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding:36px 36px 40px;font-family:${sans};color:${c.ink};">
<p style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${c.goldInk};">${esc(eyebrow)}</p>
<h1 style="margin:0 0 20px;font-family:${serif};font-size:32px;line-height:1.15;font-weight:400;color:${c.inkStrong};">${esc(title)}</h1>
${body}
</td></tr>
</table>
</td></tr>
<tr><td style="padding:28px 8px 0;font-family:${sans};font-size:13px;line-height:1.7;color:${c.ink2};">
<strong style="color:${c.inkStrong};">${site.name}</strong> · ${site.street} · ${site.zip} ${site.city}<br>
<a href="${site.phoneHref}" style="color:${c.goldInk};text-decoration:none;">${site.phone}</a> · <a href="mailto:${site.email}" style="color:${c.goldInk};text-decoration:none;">${site.email}</a> · <a href="${siteUrl}/" style="color:${c.goldInk};text-decoration:none;">${siteUrl.replace(/^https?:\/\//, "")}</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

const p = (html: string) => `<p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:${c.ink2};">${html}</p>`;

/** Numbered next steps, like a short timeline. */
function steps(items: [string, string][]): string {
  const rows = items
    .map(
      ([lead, rest], i) => `<tr>
<td valign="top" width="44" style="padding:0 0 18px;"><div style="width:32px;height:32px;line-height:32px;border-radius:16px;background:${c.gold};color:#241F19;font-family:${sans};font-size:14px;font-weight:700;text-align:center;">${i + 1}</div></td>
<td valign="top" style="padding:5px 0 18px;font-family:${sans};font-size:16px;line-height:1.55;color:${c.ink2};"><strong style="color:${c.inkStrong};">${esc(lead)}</strong> ${esc(rest)}</td>
</tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 6px;">${rows}</table>`;
}

/** Label/value rows of the submitted data. */
function details(rows: [string, string][]): string {
  const body = rows
    .map(
      ([label, value]) => `<tr>
<td valign="top" width="130" style="padding:10px 12px 10px 0;border-top:1px solid ${c.line};font-family:${sans};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${c.goldInk};">${esc(label)}</td>
<td valign="top" style="padding:10px 0;border-top:1px solid ${c.line};font-family:${sans};font-size:15px;line-height:1.5;color:${c.inkStrong};white-space:pre-line;">${esc(value)}</td>
</tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 0;border-bottom:1px solid ${c.line};">${body}</table>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;"><tr><td style="border-radius:999px;background:${c.gold};">
<a href="${href}" style="display:inline-block;padding:15px 30px;font-family:${sans};font-size:14px;font-weight:700;letter-spacing:1px;color:#241F19;text-decoration:none;">${esc(label)} &rarr;</a>
</td></tr></table>`;
}

/** Internal notification for the Gold Sohn inbox. */
export function notificationEmail(opts: { title: string; rows: [string, string][]; replyTo: string; replySubject: string }): string {
  return layout({
    preheader: opts.title,
    eyebrow: "Neue Anfrage über die Website",
    title: opts.title,
    body:
      details(opts.rows) +
      button(`mailto:${encodeURIComponent(opts.replyTo)}?subject=${encodeURIComponent(opts.replySubject)}`, "Kunden antworten"),
  });
}

/** Receipt for the customer, sent after the inbox notification was accepted. */
export function confirmationEmail(opts: { firstName: string; intro: string; next: [string, string][]; rows: [string, string][] }): string {
  return layout({
    preheader: "Ihre Anfrage ist bei uns eingegangen.",
    eyebrow: "Eingangsbestätigung",
    title: `Vielen Dank, ${opts.firstName}!`,
    body:
      p(esc(opts.intro)) +
      steps(opts.next) +
      `<p style="margin:16px 0 8px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${c.goldInk};">Ihre Angaben</p>` +
      details(opts.rows) +
      `<p style="margin:24px 0 0;font-size:15px;line-height:1.65;color:${c.ink2};">Fragen? Antworten Sie einfach auf diese E-Mail oder rufen Sie uns an: <a href="${site.phoneHref}" style="color:${c.goldInk};font-weight:700;text-decoration:none;white-space:nowrap;">${site.phone}</a>.</p>`,
  });
}
