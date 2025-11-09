import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { WebVitals } from "@/components/web-vitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "StudioX - Make Your Customers Fall in Love with Your Product | Position²",
  description: "StudioX makes your customers feel your product before they hold it. Work smarter, look cooler, launch faster with our browser-based 3D rendering platform.",
  keywords: "3D rendering, product visualization, 3D modeling, StudioX, product photography, 3D platform",
  openGraph: {
    title: "StudioX - Make Your Customers Fall in Love with Your Product",
    description: "StudioX makes your customers feel your product before they hold it. Work smarter, look cooler, launch faster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
