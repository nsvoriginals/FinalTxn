import { WalletButton } from "./WalletButton";
import { Button } from "./ui/button";
import { FileText } from "lucide-react";

export default function Hero() {
  return (
    <section className="mt-28 flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-5xl flex flex-col gap-8">
        <h1 className="font-display text-5xl md:text-7xl lg:text-[110px] leading-[1] tracking-tight">
          <span className="block">LAST TXN</span>
          <span className="text-primary">
            The Next-Gen Inheritance System on Solana
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          A non-custodial platform that automates the secure transfer of your
          digital assets on Solana. Built with trustless smart contracts,
          ensuring your legacy lives on — safely, transparently, and on-chain.
        </p>

        {/* Fixed buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <Button variant="outline" size="lg" className="gap-2">
            <FileText className="h-5 w-5" />
            View Docs
          </Button>
          <WalletButton />
        </div>
      </div>
    </section>
  );
}
