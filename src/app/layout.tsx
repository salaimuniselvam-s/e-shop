import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import React from "react";
import ContextWrapper from "@/components/ContextWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E - Shop",
  description: "Shopping Cart for all the Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextWrapper>
          <Navbar />
          {children}
        </ContextWrapper>
      </body>
    </html>
  );
}
