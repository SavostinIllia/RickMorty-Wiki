import type { Metadata } from "next";
import localFont from 'next/font/local';
import MainHeader from "@/components/MainHeader/MainHeader";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import mainTitle from '@/static/mainTitle.png'
import Link from "next/link";
import "./globals.scss";


const wubbaFont = localFont({
  src: './fonts/WubbaLubbaDubDub.otf',
  variable: '--font-wubba',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rick&Morty Wiki",
  description: "Rick and Morty Wiki",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode,
}) {

  return (
    <html lang="en">
      <body
        className={`${wubbaFont.className} antialiased relative min-h-[100vh] pb-[60px]`}
      >
        <MainHeader />
        <div className="hero-img img-wprapper w-[900px] mx-auto">
        <Link href={'/'}>
          <Image 
            src={mainTitle} 
            width={900} 
            height={200} 
            alt='Rick and Morty' 
            className="m-auto mb-5" 
            quality={80} 
            priority 
          />
        </Link>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
