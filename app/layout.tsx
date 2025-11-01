import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SolanaProvider } from "@/providers/SolanaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dotmax = localFont({
  src: "../public/dotmax-font-1761262916-0/Dotmax.otf",
  variable: "--font-dotmax",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solana Escrow",
  description: "Solana escrow application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${dotmax.variable}`}>
      <body className={geistSans.className}>
        <SolanaProvider> 
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </SolanaProvider>
      </body>
    </html>
  );
}
