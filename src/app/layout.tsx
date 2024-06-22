import "~/styles/globals.css";
import "~/styles/stars.scss";

import { GeistSans } from "geist/font/sans";
import { TopNav } from "./_components/topnav";
import { Toaster } from "~/components/ui/toaster";

export const metadata = {
  title: "StarlitMC",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TopNav />
        {children}
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <Toaster />
      </body>
    </html>
  );
}
