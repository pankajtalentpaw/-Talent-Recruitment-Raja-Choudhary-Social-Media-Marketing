import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apply – Raja Choudhary | Social Media Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg bg-body-glow font-outfit leading-[1.6] text-text">
        {children}
      </body>
    </html>
  );
}
