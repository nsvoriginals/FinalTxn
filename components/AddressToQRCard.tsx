"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { QRCodeSVG } from "qrcode.react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Download, QrCode, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WalletQRCardProps {
  totalEscrowedSOL?: number;
}

export function WalletQRCard({ totalEscrowedSOL = 0 }: WalletQRCardProps) {
  const { publicKey, connected } = useWallet();
  const [copied, setCopied] = useState(false);

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

  const handleDownload = () => {
    if (!publicKey) return;

    const svg = document.getElementById("wallet-qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `wallet-${publicKey.toBase58().slice(0, 8)}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (!connected || !publicKey) {
    return (
      <Card className="w-full shadow-lg border-2">
        <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px]">
          <QrCode className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-muted-foreground text-sm text-center">
            Connect your wallet to display QR code
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg border-2">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-3xl font-bold">Wallet QR Code</CardTitle>
        <CardDescription className="text-base">Scan to receive SOL</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
          <div className="flex items-center gap-3">
            <Wallet className="h-6 w-6 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Total Escrowed</p>
              <p className="text-2xl font-bold text-primary truncate">
                {totalEscrowedSOL.toFixed(4)} SOL
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border-2">
            <QRCodeSVG
              id="wallet-qr-code"
              value={publicKey.toBase58()}
              size={200}
              level="H"
              includeMargin={false}
              className="w-auto h-auto"
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="text-sm font-semibold">
              Devnet
            </Badge>
          </div>
          
          <div className="p-3 rounded-lg bg-muted border-2">
            <p className="text-sm text-muted-foreground mb-2 text-center">
              Public Key
            </p>
            <code className="block text-xs sm:text-sm font-mono text-center break-all">
              {publicKey.toBase58()}
            </code>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="h-11 text-sm font-semibold border-2 rounded-lg w-full"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span className="hidden sm:inline">Copied</span>
                <span className="sm:hidden">OK</span>
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </Button>

          <Button
            onClick={handleDownload}
            variant="outline"
            className="h-11 text-sm font-semibold border-2 rounded-lg w-full"
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
