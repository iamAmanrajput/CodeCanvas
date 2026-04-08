import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Heading font setup
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit", // CSS variable name
  weight: ["600", "700"], // SemiBold or Bold
});

// Body font setup
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta", // CSS variable name
  weight: ["400", "500"], // Regular or Medium
});

export const metadata: Metadata = {
  title: "CodeCanvas | AI-Powered Website Builder",
  description:
    "CodeCanvas AI is a powerful AI-driven website builder that transforms user prompts into fully functional, editable websites in real time. It offers live preview, intuitive click-to-edit functionality, and seamless customization, built with Next.js and PostgreSQL for high performance and scalability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.className} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
