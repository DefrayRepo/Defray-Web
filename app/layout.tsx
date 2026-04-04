import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Defray — Pay together, effortlessly",
  description:
    "Defray is the shared virtual card for groups. Split costs automatically, vote on options, and pay as one — without the awkward IOUs.",
  openGraph: {
    title: "Defray — Pay together, effortlessly",
    description:
      "Shared virtual card for groups. Split costs, vote on options, pay as one.",
    type: "website",
    url: "https://defray.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Defray — Pay together, effortlessly",
    description: "Shared virtual card for groups.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
