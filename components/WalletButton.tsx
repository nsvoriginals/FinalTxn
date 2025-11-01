"use client";

import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  LogOut, 
  Copy, 
  Check, 
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function WalletButton() {
  const { publicKey, disconnect, connected } = useWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();
  
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBalance = async () => {
    if (!connection || !publicKey) return;
    
    try {
      setIsRefreshing(true);
      const accountInfo = await connection.getAccountInfo(publicKey);
      if (accountInfo) {
        setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [publicKey, connection]);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
    setBalance(null);
  };

  const handleCopy = async () => {
    if (!publicKey) return;
    
    try {
      await navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleViewExplorer = () => {
    if (!publicKey) return;
    window.open(
      `https://explorer.solana.com/address/${publicKey.toBase58()}?cluster=devnet`,
      "_blank"
    );
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!connected) {
    return (
      <Button
        onClick={handleConnect}
        className="relative overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-200"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative flex items-center gap-3"
        >
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium">
              {publicKey ? shortenAddress(publicKey.toBase58()) : "Connected"}
            </span>
            {balance !== null && (
              <span className="text-[10px] text-muted-foreground font-semibold">
                {balance.toFixed(4)} SOL
              </span>
            )}
          </div>
          <Badge variant="secondary" className="text-xs">
            Devnet
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-72">
        {/* Wallet Info Header */}
        <DropdownMenuLabel className="pb-3">
          <div className="space-y-3">
            {/* Balance Display */}
            <div className="relative rounded-lg p-4 bg-muted">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Balance</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={fetchBalance}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              <div className="text-2xl font-bold text-primary">
                {balance !== null ? `${balance.toFixed(4)} SOL` : "Loading..."}
              </div>
              <Badge variant="secondary" className="mt-2">
                Devnet
              </Badge>
            </div>

            {/* Address Display */}
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Wallet Address</span>
              <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                <code className="text-xs font-mono flex-1 truncate">
                  {publicKey?.toBase58()}
                </code>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Action Items */}
        <DropdownMenuItem onClick={handleCopy} className="cursor-pointer">
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? "Copied!" : "Copy Address"}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleViewExplorer} className="cursor-pointer">
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleDisconnect} 
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
