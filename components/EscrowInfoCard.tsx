// components/EscrowInfoCard.tsx
"use client";

import { Clock, Wallet, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface EscrowInfo {
  beneficiary: string;
  balance: number;
  lastCheckIn: Date;
  deadline: Date;
}

export default function EscrowInfoCard(props: EscrowInfo) {
  const timeRemainingMs = props.deadline.getTime() - Date.now();
  const daysRemaining = Math.max(
    Math.ceil(timeRemainingMs / (1000 * 60 * 60 * 24)),
    0
  );

  // Truncate wallet address for display
  const shortAddress = `${props.beneficiary.slice(0, 6)}...${props.beneficiary.slice(-4)}`;

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-center text-foreground">
          Escrow Info
        </CardTitle>
        <CardDescription className="text-center">
          Monitor your escrow status and activity
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Balance Highlight */}
        <div className="bg-muted rounded-xl p-6 text-center border">
          <p className="text-sm text-muted-foreground mb-1">Balance</p>
          <p className="text-4xl font-bold text-primary">
            {props.balance} SOL
          </p>
          <Badge variant="secondary" className="mt-3">
            <Clock className="w-3 h-3 mr-1" />
            {daysRemaining} days left
          </Badge>
        </div>

        <Separator />

        {/* Info Grid */}
        <div className="space-y-4">
          {/* Beneficiary */}
          <div className="flex items-start gap-3">
            <div className="mt-1 p-2 rounded-lg bg-secondary">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Beneficiary</p>
              <p className="font-medium text-sm break-all" title={props.beneficiary}>
                {shortAddress}
              </p>
            </div>
          </div>

          {/* Last Check-in */}
          <div className="flex items-start gap-3">
            <div className="mt-1 p-2 rounded-lg bg-secondary">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Last Check-in</p>
              <p className="font-medium text-sm">
                {props.lastCheckIn.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-start gap-3">
            <div className="mt-1 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
              <Calendar className="w-4 h-4 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Deadline</p>
              <p className="font-medium text-sm">
                {props.deadline.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 pt-4">
        <Button className="flex-1 shadow-md hover:shadow-lg">
          <Activity className="w-4 h-4 mr-2" />
          Heartbeat
        </Button>
        <Button
          variant="destructive"
          className="flex-1 shadow-md hover:shadow-lg"
        >
          Claim
        </Button>
      </CardFooter>
    </Card>
  );
}
