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
  keywords: ["Programming", "Challenges", "Creative", "Coding", "Fun"],
  authors: [{ name: "iDev Team" }],
  creator: "iDev Team",
  openGraph: {
    title: "iDev",
    description: "FUN | CREATIVE | PROGRAMMING",
    url: "idev-challenge.netlify.app",
    siteName: "iDev",
    images: [
      {
        url: "/public/images/logo.png", 
        width: 1200,
        height: 630,
        alt: "iDev",
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
    <html lang="en">
      <head>
        {/* AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3378932056063759"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${bebasNeue.variable}  h-screen bg-[url('/images/background.svg')] bg-center bg-no-repeat bg-fixed bg-cover min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
