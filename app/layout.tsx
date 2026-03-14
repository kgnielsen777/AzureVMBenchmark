import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azure VM Performance Benchmarks",
  description: "Compare Azure VM performance and pricing across series and versions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
