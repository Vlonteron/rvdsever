import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/lib/seo";
import StructuredData from "@/components/SEO/StructuredData";
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
  const vameraKey =
    process.env.NEXT_PUBLIC_VAMERA_WIDGET_KEY || process.env.VAMERA_WIDGET_KEY;

  const widgetScriptUrl = vameraKey
    ? vameraKey.startsWith("http")
      ? vameraKey
      : `https://widget.vamera.ai/widget/${vameraKey}`
    : null;

  return (
    <html lang="uk">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
        {widgetScriptUrl && (
          <Script
            src={widgetScriptUrl}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
