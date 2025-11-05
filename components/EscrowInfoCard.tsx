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
  address?: string;
  seed?: string;
  owner?: string;
  onUpdate?: () => void;
}

export default function EscrowInfoCard(props: EscrowInfo) {
  const timeRemainingMs = props.deadline.getTime() - Date.now();
  const daysRemaining = Math.max(
    Math.ceil(timeRemainingMs / (1000 * 60 * 60 * 24)),
    0
  );

  const shortAddress = `${props.beneficiary.slice(0, 6)}...${props.beneficiary.slice(-4)}`;

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Card className="w-full shadow-lg border-2">
      <CardHeader className="space-y-2 pb-3">
        <CardTitle className="text-2xl font-bold">Escrow Info</CardTitle>
        <CardDescription className="text-sm">
          Monitor your escrow status and activity
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-5 border-2 border-primary/20">
          <p className="text-sm text-muted-foreground mb-2">Balance</p>
          <p className="text-3xl sm:text-4xl font-bold text-primary">
            {props.balance.toFixed(4)} SOL
          </p>
          <Badge className="mt-3 text-xs sm:text-sm">
            <Clock className="w-3 h-3 mr-1.5" />
            {daysRemaining} days left
          </Badge>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 p-2.5 rounded-lg bg-secondary flex-shrink-0">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Beneficiary
              </p>
              <p className="font-semibold text-sm break-all" title={props.beneficiary}>
                {shortAddress}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 p-2.5 rounded-lg bg-secondary flex-shrink-0">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Last Check-in
              </p>
              <p className="font-semibold text-sm">{formatDate(props.lastCheckIn)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 flex-shrink-0">
              <Calendar className="w-4 h-4 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Deadline
              </p>
              <p className="font-semibold text-sm">{formatDate(props.deadline)}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 pt-4">
        <Button className="flex-1 h-11 text-sm font-semibold border-2">
          <Activity className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Heartbeat</span>
          <span className="sm:hidden">Beat</span>
        </Button>
        <Button
          variant="destructive"
          className="flex-1 h-11 text-sm font-semibold border-2"
        >
          Claim
        </Button>
      </CardFooter>
    </Card>
  );
}
