import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profileData } from "@/data/profile";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://portfolio.com"
      : "http://localhost:3000"
  ),
  title: `${profileData.name} | Portfolio`,
  description: profileData.headline,
  openGraph: {
    title: `${profileData.name} | Portfolio`,
    description: profileData.headline,
    url: "https://portfolio.com", // Placeholder
    siteName: profileData.name,
    images: [
      {
        url: "/photo.png", // Use photo as og:image placeholder
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-foreground relative`}
      >
        {/* Global Cinematic Background */}
        <div className="fixed inset-0 z-[-2] pointer-events-none">
          <Image 
            src="/moody.png" 
            alt="Moody Background" 
            fill 
            sizes="100vw"
            className="object-cover object-center" 
            priority
            quality={100}
          />
        </div>
        {/* Dark overlay to ensure text readability across sections */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-black/40 backdrop-blur-[2px]" />
        
        {children}
      </body>
    </html>
  );
}
