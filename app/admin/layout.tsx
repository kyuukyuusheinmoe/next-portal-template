import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftSidebar from "../containers/LeftSidebar";
import TopBar from "../containers/TopBar";
import MainContainer from "../containers/MainContainer";
import clsx from 'clsx'
import { project } from "../constants/projectMeta";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: project.name,
  description: project.description,
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className)}>
          <TopBar/>
            <div className="drawer drawer-open w-[20rem] hidden md:block"> 
                <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <LeftSidebar/>
            </div>
            <MainContainer> {children} </MainContainer>
      </body>
    </html>
  );
}

export default RootLayout
