import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, type Idl } from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const programId = new PublicKey("DkNBjnt2ryrE2iEzaPsbjnSJGTBS3DwuaeoxvNiHkQTZ");

// Define the IDL with the correct format
const idl: Idl = {
    address: "DkNBjnt2ryrE2iEzaPsbjnSJGTBS3DwuaeoxvNiHkQTZ",
    metadata: {
        name: "dead_man_switch",
        version: "0.1.0",
        spec: "0.1.0",
    },
    instructions: [
        {
            name: "initialize",
            discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
            accounts: [
                { name: "owner", writable: true, signer: true },
                { name: "escrow", writable: true },
                { name: "systemProgram", address: "11111111111111111111111111111111" },
            ],
            args: [
                { name: "deadline", type: "i64" },
                { name: "beneficiary", type: "pubkey" },
                { name: "seed", type: "string" },
            ],
        },
        {
            name: "deposit",
            discriminator: [242, 35, 198, 137, 82, 225, 242, 182],
            accounts: [
                { name: "owner", writable: true, signer: true },
                { name: "escrow", writable: true },
                { name: "systemProgram", address: "11111111111111111111111111111111" },
            ],
            args: [{ name: "amount", type: "u64" }],
        },
        {
            name: "checkin",
            discriminator: [158, 190, 188, 104, 205, 138, 210, 89],
            accounts: [
                { name: "owner", writable: true, signer: true },
                { name: "escrow", writable: true },
            ],
            args: [{ name: "newDeadline", type: "i64" }],
        },
        {
            name: "claim",
            discriminator: [62, 198, 214, 193, 213, 159, 108, 210],
            accounts: [
                { name: "beneficiary", writable: true },
                { name: "escrow", writable: true },
                { name: "systemProgram", address: "11111111111111111111111111111111" },
            ],
            args: [],
        },
        {
            name: "cancel",
            discriminator: [232, 219, 223, 41, 219, 236, 220, 190],
            accounts: [
                { name: "owner", writable: true, signer: true },
                { name: "escrow", writable: true },
                { name: "systemProgram", address: "11111111111111111111111111111111" },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: "Escrow",
            discriminator: [31, 213, 123, 187, 186, 22, 218, 155],
        },
    ],
    types: [
        {
            name: "Escrow",
            type: {
                kind: "struct",
                fields: [
                    { name: "owner", type: "pubkey" },
                    { name: "beneficiary", type: "pubkey" },
                    { name: "deadline", type: "i64" },
                    { name: "lastCheckin", type: "i64" },
                    { name: "bump", type: "u8" },
                    { name: "seed", type: "string" },
                ],
            },
        },
    ],
    errors: [
        { code: 6000, name: "InvalidDeadline", msg: "Invalid deadline" },
        { code: 6001, name: "InvalidAmount", msg: "Invalid amount" },
        { code: 6002, name: "DeadlineExceeded", msg: "Deadline exceeded" },
        { code: 6003, name: "DeadlineNotReached", msg: "Deadline not reached" },
    ],
};

export function useAnchor() {
    const wallet = useAnchorWallet();

    if (!wallet) {
        return { program: null, provider: null, wallet: null, connection: null };
    }

    const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
    );

    const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
    });

    const program = new Program(idl, provider);

    return { program, provider, wallet, connection };
}