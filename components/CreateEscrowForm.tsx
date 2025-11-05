"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { useAnchor } from "@/hooks/useAnchor";

interface CreateEscrowFormProps {
  onSuccess?: () => void;
}

export default function CreateEscrowForm({ onSuccess }: CreateEscrowFormProps) {
  const { program, wallet } = useAnchor();
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date>();
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!program || !wallet?.publicKey) {
        alert("Wallet not connected or program not initialized");
        return;
      }

      if (!beneficiary || !amount || !date) {
        alert("Please fill all required fields");
        return;
      }

      setIsSubmitting(true);

      const beneficiaryPubkey = new PublicKey(beneficiary);
      const deadlineUnix = Math.floor(date.getTime() / 1000);
      const depositAmount = new anchor.BN(Number(amount) * LAMPORTS_PER_SOL);
      const seed = Math.random().toString(36).substring(2, 8);

      const [escrowPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from(seed), wallet.publicKey.toBuffer()],
        program.programId
      );

      console.log("Escrow PDA:", escrowPDA.toBase58());

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

      await program.methods
        .deposit(depositAmount)
        .accounts({
          owner: wallet.publicKey,
          escrow: escrowPDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      alert("Escrow created successfully!");

      setBeneficiary("");
      setAmount("");
      setDate(undefined);
      setNote("");

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      alert("Transaction failed. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-2">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-3xl font-bold">Create Escrow</CardTitle>
        <CardDescription className="text-base">
          Set up a new escrow with beneficiary and unlock date
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="beneficiary" className="text-base font-semibold">
              Beneficiary Wallet Address
            </Label>
            <Input
              id="beneficiary"
              type="text"
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              placeholder="Enter Solana wallet address"
              required
              disabled={isSubmitting}
              className="h-12 text-base px-4 border-2 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <Label htmlFor="amount" className="text-base font-semibold">
                Amount (SOL)
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 1.5"
                step="0.01"
                min="0.01"
                required
                disabled={isSubmitting}
                className="h-12 text-base px-4 border-2 rounded-lg"
              />
            </div>

            <div className="space-y-2.5">
              <Label className="text-base font-semibold">Unlock Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isSubmitting}
                    className={`h-12 text-base px-4 border-2 rounded-lg justify-start font-normal ${
                      !date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span className="truncate">
                      {date ? format(date, "PPP") : "Pick a date"}
                    </span>
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
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="note" className="text-base font-semibold">
              Note (optional)
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a message or reason for this escrow"
              rows={4}
              disabled={isSubmitting}
              className="text-base px-4 py-3 border-2 rounded-lg resize-none"
            />
          </div>

          <Button
            type="submit"
            className="h-12 text-base font-semibold rounded-lg w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Escrow"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
