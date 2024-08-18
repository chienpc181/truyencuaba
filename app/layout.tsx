import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Truyen Cua Ba",
  description: "Truyen cua ba Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="winter">
      <body>
        <header>
          <Navbar></Navbar>
        </header>
        <main>
        {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
