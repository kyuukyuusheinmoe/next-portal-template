import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"
import LeftSidebar from "../containers/LeftSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mortgage Management",
  description: "RACB Management Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
        <div className="drawer drawer-open w-[20rem]"> 
            <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
            <LeftSidebar/>
        </div>
        {children}
        </div></body>
    </html>
  );
}
