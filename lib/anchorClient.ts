import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "@/idl/idl.json";
import type { LastTxn } from "@/types/Txn.ts";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const programId = new PublicKey("DkNBjnt2ryrE2iEzaPsbjnSJGTBS3DwuaeoxvNiHkQTZ");

export function useAnchor() {
  const wallet = useAnchorWallet();

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const provider = new AnchorProvider(connection, wallet!, {
    commitment: "confirmed",
  });

  const program = new Program<LastTxn>(idl as LastTxn, provider);

  return { program, provider, wallet, connection };
}
