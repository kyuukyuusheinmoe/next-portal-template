import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { project } from "./constants/projectMeta";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: project.name,
  description: project.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
