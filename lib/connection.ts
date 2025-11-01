// src/utils/connection.ts
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import idl from '../idl/idl.json';

// RPC (Devnet for now)
export const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export const getProgram = (wallet: Wallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "confirmed",
  });

  const program = new Program(idl as any, new PublicKey(idl.metadata.address), provider);

  return { program, provider };
};
