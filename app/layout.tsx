import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import { cn } from "@/lib/utils";
import Footer from "@/components/Home/Footer/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const font = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shreeyash Shrestha Portfolio",
  description: "Portfolio built with Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "bg-[#0d0d1f]",
        font.className,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d1f]">
        <ResponsiveNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
