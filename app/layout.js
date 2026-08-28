import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Schedule a Conversation | Ignitho",
  description:
    "Connecting you to specialist expertise, book a 30-minute conversation about scaling your data estate, Frugal Innovation, and your Data & AI investments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full`}>
      <body className="min-h-full bg-white">
        {children}
        <Analytics />
      </body>

      {/* GA4. Loads gtag.js after hydration rather than blocking first paint. */}
      <GoogleAnalytics gaId="G-4EGTDXC0CL" />
    </html>
  );
}
