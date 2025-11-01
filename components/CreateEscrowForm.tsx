"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnchor } from "@/lib/anchorClient";
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";

export default function CreateEscrowForm() {
  const { program, wallet } = useAnchor();

  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date>();
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!wallet?.publicKey) {
        alert("Wallet not connected");
        return;
      }

      if (!beneficiary || !amount || !date) {
        alert("Please fill all required fields");
        return;
      }

      const beneficiaryPubkey = new PublicKey(beneficiary);
      const deadlineUnix = Math.floor(date.getTime() / 1000);
      const depositAmount = new anchor.BN(Number(amount) * LAMPORTS_PER_SOL);
      const seed = Math.random().toString(36).substring(2, 8); // random seed

      // PDA: seed + owner pubkey
      const [escrowPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from(seed), wallet.publicKey.toBuffer()],
        program.programId
      );

      console.log("Escrow PDA:", escrowPDA.toBase58());

      // 1️⃣ Initialize escrow account
      await program.methods
        .initialize(
          new anchor.BN(deadlineUnix),
          beneficiaryPubkey,
          seed
        )
        .accounts({
          owner: wallet.publicKey,
          escrow: escrowPDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // 2️⃣ Deposit funds
      await program.methods
        .deposit(depositAmount)
        .accounts({
          owner: wallet.publicKey,
          escrow: escrowPDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      alert("✅ Escrow created successfully!");

      setBeneficiary("");
      setAmount("");
      setDate(undefined);
      setNote("");

    } catch (err) {
      console.error(err);
      alert("❌ Transaction failed. Check console.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center ">
          Create Escrow
        </CardTitle>
        <CardDescription className="text-center">
          Set up a new escrow with beneficiary and unlock date
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Beneficiary */}
          <div className="space-y-2">
            <Label htmlFor="beneficiary">Beneficiary Wallet Address</Label>
            <Input
              id="beneficiary"
              type="text"
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              placeholder="Enter Solana wallet address"
              required
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (SOL)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 1.5"
              step="0.01"
              required
            />
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label>Unlock Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Optional note */}
          <div className="space-y-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a message or reason for this escrow"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Escrow
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
