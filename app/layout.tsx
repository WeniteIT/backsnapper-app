import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./_components/Header";
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
        <div className="secondary-text container-background flex justify-center font-[family-name:var(--font-geist-sans)] h-full bg-cover bg-center bg-no-repeat">
          <div
            className="flex gap-2 md:gap-4 flex-col-reverse p-2 sm:p-4 sm:px-10 2xl:flex-row w-450 h-full"
            style={{
              backgroundColor: "rgba(0,0,0, 0.04)",
            }}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
