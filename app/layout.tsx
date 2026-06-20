import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "CebulaCore Lite — AI-Powered Cloud Architecture Advisor",
  description:
    "CebulaCore Lite converts business requirements into cloud architecture recommendations across AWS, Azure, and GCP. Advisory-only — it never accesses or modifies your cloud resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
