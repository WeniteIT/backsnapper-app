import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./_components/layout/Footer";
import Header from "./_components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BackSNAPPER",
  description: "BackSnapper",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased secondary-root font-[family-name:var(--font-geist-sans)] h-full overflow-y-scroll`}
      >
        <Header />
        <div className="secondary-text container-background flex justify-center h-full bg-cover bg-center bg-no-repeat pt-13 md:pt-6 px-1 md:px-2 ">
          <div
            className="flex gap-2 md:gap-3 flex-col sm:px-10 2xl:flex-row w-450 h-full pt-4 md:pt-14 pb-6 secondary-transparent"
            style={{
              minHeight: "calc(100vh - 5rem)",
            }}
          >
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
