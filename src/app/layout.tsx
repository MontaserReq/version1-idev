import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";


const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});


export const metadata: Metadata = {
  title: "iDev",
  description: "FUN | CREATIVE | PROGRAMMING",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
           <body className={`${bebasNeue.variable} bg-[#1e2227] h-screen bg-[url('/images/background.svg')] bg-center bg-no-repeat bg-fixed bg-cover min-h-screen `}>{children}</body>
    </html>
  );
}
