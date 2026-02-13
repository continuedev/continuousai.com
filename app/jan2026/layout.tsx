import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jan 2026 Dinner | Continuous AI",
  description: "San Francisco · January 2026",
  openGraph: {
    type: "website",
    title: "Continuous AI Dinner",
    description: "San Francisco · January 2026",
    url: "https://continuousai.com/jan2026",
    siteName: "Continuous AI",
    images: [
      {
        url: "/og-image.gif",
        width: 1200,
        height: 630,
        alt: "Continuous AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Continuous AI Dinner",
    description: "San Francisco · January 2026",
    images: ["/og-image.gif"],
  },
};

export default function Jan2025Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          background: #0a0a0b;
          margin: 0;
          padding: 0;
        }
        .jan2025-page {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .jan2025-page.loaded {
          opacity: 1;
        }
        img {
          max-width: 16px;
          max-height: 16px;
        }
      `}} />
      {children}
    </>
  );
}
