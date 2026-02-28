import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Star Plast – Industrial PET Packaging Solutions",
  description:
    "Premium industrial PET packaging solutions engineered for quality, durability, and manufacturing excellence.",
  icons: {
    icon: "/web_icon.png",
    apple: "/web_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${outfit.variable} font-sans antialiased bg-[#E4E4E4] text-gray-900 min-h-screen`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
