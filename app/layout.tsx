import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Continuous AI",
  description: "The practice of developing software with background agents",
  icons: {
    icon: "/favicon.svg?v=4",
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
        <link rel="icon" href="/favicon.svg?v=4" type="image/svg+xml" />
        <link
          rel="alternate icon"
          href="/favicon.svg?v=4"
          type="image/svg+xml"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Molengo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-['Molengo',sans-serif]">{children}</body>
    </html>
  );
}
