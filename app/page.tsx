"use client";

import { Navbar } from "@/components/Navbar";
import CreateEscrowForm from "@/components/CreateEscrowForm";
import EscrowInfoCard from "@/components/EscrowInfoCard";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletQRCard } from "@/components/AddressToQRCard";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Features from "@/components/Features";

export default function Home() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />
      
      {/* Features Section */}
      <Features />
      
      {/* Main App Section (Only when wallet connected) */}
 
       <div className="container mx-auto px-4 py-16">
        <Footer />

       </div>
      {/* Footer */}
      
    </div>
  );
}
