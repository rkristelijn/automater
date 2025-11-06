import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toolpad Admin Dashboard",
  description: "Admin interface built with MUI Toolpad Core",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      // Inline style: Ensures full viewport height for layout components
      // Best practice: Minimal CSS reset for full-height layouts
      style={{ height: '100%' }}
    >
      <body 
        className={`${geistSans.variable} ${geistMono.variable}`} 
        // Inline style: Full height + reset default margin
        // Alternative: Could use global CSS, but inline is simpler for layout fundamentals
        // Best practice: Keep layout-critical styles close to component
        style={{ height: '100%', margin: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
