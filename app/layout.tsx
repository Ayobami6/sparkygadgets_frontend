'use client'
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });
import React, { FC, useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Heading from "@/components/Heading";


// export const metadata: Metadata = {
//   title: "Toke's Collection",
//   description: "Men and Women's Clothings, Shoes, Slides, Bags...",
//   icons: {
//     icon: "/images/oyin.jpg",
//   }
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Heading />
        <Loading>
          <main>
            {children}
          </main>
          <Toaster />
        </Loading>
      </body>
    </html>
  );
}


const Loading: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return (
    <Loader />
  ); // Don't render anything until after hydration
  return (
    <>
      {children}
    </>
  )

};