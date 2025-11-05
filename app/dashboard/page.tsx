"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import EscrowInfoCard from "@/components/EscrowInfoCard";
import CreateEscrowForm from "@/components/CreateEscrowForm";
import { WalletQRCard } from "@/components/AddressToQRCard";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAnchor } from "@/hooks/useAnchor";

interface EscrowData {
  address: string;
  beneficiary: string;
  balance: number;
  lastCheckIn: Date;
  deadline: Date;
  seed: string;
  owner: string;
}

export default function Dashboard() {
  const { connected } = useWallet();
  const { program, wallet } = useAnchor();
  const [escrows, setEscrows] = useState<EscrowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (connected && program && wallet && !hasFetched) {
      const timer = setTimeout(() => {
        fetchEscrows();
      }, 500);

      return () => clearTimeout(timer);
    } else if (!connected) {
      setEscrows([]);
      setLoading(false);
      setHasFetched(false);
    }
   
  }, [connected, hasFetched]);

  const fetchEscrows = async () => {
    if (!program || !wallet) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const accounts = await program.account.escrow.all([
        {
          memcmp: {
            offset: 8,
            bytes: wallet.publicKey.toBase58(),
          },
        },
      ]);

      setHasFetched(true);

      if (!accounts || accounts.length === 0) {
        setEscrows([]);
        setLoading(false);
        return;
      }

      const escrowData: EscrowData[] = await Promise.all(
        accounts.map(async (account: any) => {
          const escrowAccount = account.account as any;
          
          const balance = await program.provider.connection.getBalance(
            account.publicKey
          );

          return {
            address: account.publicKey.toBase58(),
            beneficiary: escrowAccount.beneficiary.toBase58(),
            balance: balance / 1e9,
            lastCheckIn: new Date(escrowAccount.lastCheckin.toNumber() * 1000),
            deadline: new Date(escrowAccount.deadline.toNumber() * 1000),
            seed: escrowAccount.seed,
            owner: escrowAccount.owner.toBase58(),
          };
        })
      );

      setEscrows(escrowData);
    } catch (error: any) {
      console.error("Error fetching escrows:", error);
      setHasFetched(true);
      setEscrows([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          {!connected ? (
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">
                  Welcome to Solana Escrow
                </h2>
                <p className="text-xl text-muted-foreground">
                  Please connect your wallet to continue
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
           
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
                <div className="flex">
                  <CreateEscrowForm onSuccess={fetchEscrows} />
                </div>

              
                <div className="flex">
                   <WalletQRCard 
    totalEscrowedSOL={escrows.reduce((sum, escrow) => sum + escrow.balance, 0)}
  />
                </div>
              </div>

            
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Your Escrows
                  </h2>
                  <button
                    onClick={() => {
                      setHasFetched(false);
                      fetchEscrows();
                    }}
                    disabled={loading}
                    className="px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Refresh"}
                  </button>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-20 border-2 border-dashed rounded-lg">
                    <div className="text-center space-y-2">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto" />
                      <p className="text-muted-foreground text-lg">
                        Loading escrows...
                      </p>
                    </div>
                  </div>
                ) : escrows.length === 0 ? (
                  <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/20">
                    <h3 className="text-2xl font-semibold mb-2">
                      No Escrows Yet
                    </h3>
                    <p className="text-muted-foreground">
                      Create your first escrow using the form above
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {escrows.map((escrow) => (
                      <EscrowInfoCard
                        key={escrow.address}
                        address={escrow.address}
                        beneficiary={escrow.beneficiary}
                        balance={escrow.balance}
                        lastCheckIn={escrow.lastCheckIn}
                        deadline={escrow.deadline}
                        seed={escrow.seed}
                        owner={escrow.owner}
                        onUpdate={() => {
                          setHasFetched(false);
                          fetchEscrows();
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
