import "~/styles/globals.css";
import "~/styles/stars.scss";

import { GeistSans } from "geist/font/sans";
import { Toaster } from "~/components/ui/toaster";
import CookieBanner from "./_components/cookiebanner";
import { TopNav } from "./_components/topnav";
import { cookies } from "next/headers";

export const metadata = {
  title: "StarlitMC",
  description: "F2P Friendly Casual Cobblemon Server",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieHeader = cookies();
  const cookieConsent = cookieHeader.get("cookie-consent")?.value ?? null;
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TopNav />
        {children}
        <CookieBanner cookieConsent={cookieConsent} />
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <Toaster />
      </body>
    </html>
  );
}
