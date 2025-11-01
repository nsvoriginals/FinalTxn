"use client";

import { Navbar } from "@/components/Navbar";
import EscrowInfoCard from "@/components/EscrowInfoCard";
import CreateEscrowForm from "@/components/CreateEscrowForm";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Dashboard() {
  const { connected } = useWallet();

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-16 w-full">
        {!connected ? (
          // ------------------- NO WALLET CONNECTED ------------------
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Welcome to Solana Escrow</h2>
              <p className="text-xl text-muted-foreground">
                Please connect your wallet to continue
              </p>
            </div>
          </div>
        ) : (
          // ------------------- WALLET CONNECTED ------------------
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT COLUMN - ESCROW CARDS */}
            <div className="space-y-8">
              <EscrowInfoCard
                beneficiary="8xhTq2...3xZb"
                balance={23}
                lastCheckIn={new Date("2025-10-15T12:00:00Z")}
                deadline={new Date("2025-11-01T00:00:00Z")}
              />
              <EscrowInfoCard
                beneficiary="5yKp1m...9xAc"
                balance={45}
                lastCheckIn={new Date("2025-10-20T08:30:00Z")}
                deadline={new Date("2025-12-15T00:00:00Z")}
              />
            </div>

            {/* RIGHT COLUMN - CREATE ESCROW FORM */}
            <div>
              <CreateEscrowForm />
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
