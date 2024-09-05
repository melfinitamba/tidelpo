import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { inter, grenze, overlock, slackey } from "@/styles/fonts";
import { twMerge } from "tailwind-merge";
import dataseo from "@/content/seo.json";

export const metadata: Metadata = {
  title: dataseo.title,
  description: dataseo.description,
  generator: dataseo.generator,
  applicationName: dataseo.applicationName,
  authors: dataseo.authors,
  creator: dataseo.creator,
  publisher: dataseo.publisher,
  referrer: "origin-when-cross-origin",
  keywords: dataseo.keywords,
  openGraph: {
    title: dataseo.title,
    url: dataseo.url,
    type: "website",
    locale: dataseo.locale,
    siteName: dataseo.title,
    description: dataseo.description,
    images: [
      {
        url: dataseo.url + dataseo.logo,
        width: 1200,
        height: 630,
        alt: "LogoTidelpo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={twMerge(
            inter.className,
            grenze.variable,
            overlock.variable,
            slackey.variable
          )}
        >
          {" "}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
