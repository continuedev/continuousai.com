import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Continuous AI",
  description: "Ship as fast as you code. Automating the workflows around code, not just the code itself.",
  metadataBase: new URL('https://continuousai.com'),
  icons: {
    icon: '/favicon.svg?v=5',
  },
  openGraph: {
    title: 'Continuous AI',
    description: 'Ship as fast as you code.',
    url: 'https://continuousai.com',
    siteName: 'Continuous AI',
    images: [
      {
        url: '/og-image.gif',
        width: 1200,
        height: 630,
        alt: 'Continuous AI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Continuous AI',
    description: 'Ship as fast as you code.',
    images: ['/og-image.gif'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg?v=5" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg?v=5" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Instrument+Serif:ital@0;1&family=Outfit:wght@500;600;700&family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-['Syne',sans-serif]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#c8ff00] focus:text-black focus:rounded">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
