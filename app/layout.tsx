import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Montserrat} from "next/font/google"
import {Orbitron} from "next/font/google"
import "react-toastify/ReactToastify.css"
import {ToastContainer} from "react-toastify" ;
import QueryProvider from "@/lib/QueryProvider";
// import QueryProvider from "@/lib/QueryProvider" ;

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
        <QueryProvider>
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false} 
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover={false}
            theme="dark"
          />
          {children}
    
        </QueryProvider>
      </body>
    </html>
  );
}
