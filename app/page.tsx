"use client";

import { Navbar } from "@/components/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Features from "@/components/Features";

export default function Home() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full">
        <section id="hero" className="w-full">
          <Hero />
        </section>

        <section id="about" className="w-full">
          <About />
        </section>

       
 
      </main>

   
    </div>
  );
}
