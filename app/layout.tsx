import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/lib/seo";
import StructuredData from "@/components/SEO/StructuredData";

const WIDGET_SCRIPT_URL = "https://widget.lonteron.dev/widget/pg1Qci2wb8w";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
        <Script
          src={WIDGET_SCRIPT_URL}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
