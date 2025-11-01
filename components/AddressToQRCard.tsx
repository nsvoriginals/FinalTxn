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
import { Copy, Check, Download, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WalletQRCard() {
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
      <Card className="w-full max-w-md mx-auto relative overflow-hidden border-white/20 shadow-2xl backdrop-blur-xl bg-white/10 dark:bg-gray-900/10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-indigo-500/20 pointer-events-none" />
        <CardContent className="flex flex-col items-center justify-center p-12 relative z-10">
          <QrCode className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Connect your wallet to display QR code
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto relative overflow-hidden border-white/20 shadow-2xl backdrop-blur-xl bg-white/10 dark:bg-gray-900/10">
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-3xl -z-10" />
      <div className="absolute inset-[0] rounded-xl border border-white/30 pointer-events-none" />

      <CardHeader className="space-y-1 relative z-10 text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent drop-shadow-lg">
          Wallet QR Code
        </CardTitle>
        <CardDescription className="text-gray-700 dark:text-gray-300">
          Scan to receive SOL
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {/* QR Code Container */}
        <div className="relative">
          <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border-2 border-white/40 shadow-inner mx-auto w-fit">
            {/* QR Code with gradient background */}
            <div className="relative p-4 rounded-xl bg-gradient-to-br from-secondary to-secondary dark:from-violet-900 dark:to-indigo-900">
              <QRCodeSVG
                id="wallet-qr-code"
                value={publicKey.toBase58()}
                size={220}
                level="H"
                includeMargin={false}
                fgColor="#4c1d95" // violet-900
                bgColor="transparent"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />
        </div>

        {/* Address Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Badge className="backdrop-blur-md bg-primary/30 text-primary dark:text-muted-foreground border-white/30">
              Devnet
            </Badge>
          </div>
          
          <div className="p-3 rounded-lg backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border border-white/30">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 text-center">
              Public Key
            </p>
            <code className="block text-xs font-mono text-center break-all text-gray-900 dark:text-gray-100">
              {publicKey.toBase58()}
            </code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border-white/30 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>

          <Button
            onClick={handleDownload}
            variant="outline"
            className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border-white/30 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
