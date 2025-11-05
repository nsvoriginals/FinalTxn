"use client";

import { WalletButton } from "./WalletButton";
import Link from "next/link";
import ThemeToggleButton from "./ui/theme-toggle-button";
import { Button } from "./ui/button";
import { Code2 } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
       
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
             <Link 
          href="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
           <h1 className="text-xl md:text-2xl font-bold font-display text-foreground">
              LAST TXN
            </h1>
        </Link>
           
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* View Contract Button */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex items-center gap-2 hover:bg-accent"
            onClick={() => window.open("https://explorer.solana.com", "_blank")}
          >
            <Code2 className="h-4 w-4" />
            <span className="hidden md:inline">Contract</span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggleButton variant="circle" />

          {/* Wallet Button */}
          <WalletButton />
        </div>
      </div>
    </nav>
  );
}
