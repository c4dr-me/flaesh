'use client';

import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { IBM_Plex_Sans } from "next/font/google";
import classNames from "classnames";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); 
  const renderHeader = !pathname.includes("/dashboard"); 

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: { colorPrimary: "#624cf5" },
      }}
    >
      <html lang="en">
        <title>Flaesh</title>
        <link rel = "icon" href = "/logo.png" />
        <body className={classNames("font-IBMPlex antialiased", IBMPlex.variable)}>
          <AnimatedBackground />
          {renderHeader && <Header />}
          <SidebarProvider>{children}
          <Analytics />
          </SidebarProvider>
          {renderHeader && <Footer />}
          
        </body>
      </html>
    </ClerkProvider>
  );
}
