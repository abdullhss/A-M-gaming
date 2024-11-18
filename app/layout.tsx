import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Montserrat} from "next/font/google"
import {Orbitron} from "next/font/google"


const montserrat = Montserrat({weight:["300" , "400" , "700"] , subsets:["latin"]})

const orbitron = Orbitron({weight:["400" , "700"] , subsets:["latin"]}) 

export const metadata: Metadata = {
  title: "A&M Games",
  description: "this is gaming website ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.className} dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
