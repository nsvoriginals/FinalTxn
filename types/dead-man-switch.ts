import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';

export type DeadManSwitch = {
  address: "DkNBjnt2ryrE2iEzaPsbjnSJGTBS3DwuaeoxvNiHkQTZ";
  metadata: {
    name: "dead_man_switch";
    version: "0.1.0";
    spec: "0.1.0";
  };
  instructions: [
    {
      name: "initialize";
      discriminator: number[];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "escrow";
          writable: true;
          signer: false;
        },
        {
          name: "systemProgram";
          writable: false;
          signer: false;
        }
      ];
      args: [
        {
          name: "deadline";
          type: "i64";
        },
        {
          name: "beneficiary";
          type: "publicKey";
        },
        {
          name: "seed";
          type: "string";
        }
      ];
    },
    {
      name: "deposit";
      discriminator: number[];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "escrow";
          writable: true;
          signer: false;
        },
        {
          name: "systemProgram";
          writable: false;
          signer: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "checkin";
      discriminator: number[];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "escrow";
          writable: true;
          signer: false;
        }
      ];
      args: [
        {
          name: "newDeadline";
          type: "i64";
        }
      ];
    },
    {
      name: "claim";
      discriminator: number[];
      accounts: [
        {
          name: "beneficiary";
          writable: true;
          signer: false;
        },
        {
          name: "escrow";
          writable: true;
          signer: false;
        },
        {
          name: "systemProgram";
          writable: false;
          signer: false;
        }
      ];
      args: [];
    },
    {
      name: "cancel";
      discriminator: number[];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "escrow";
          writable: true;
          signer: false;
        },
        {
          name: "systemProgram";
          writable: false;
          signer: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "Escrow";
      discriminator: number[];
    }
  ];
  types: [
    {
      name: "Escrow";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "beneficiary";
            type: "publicKey";
          },
          {
            name: "deadline";
            type: "i64";
          },
          {
            name: "lastCheckin";
            type: "i64";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "seed";
            type: "string";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidDeadline";
      msg: "Invalid deadline";
    },
    {
      code: 6001;
      name: "InvalidAmount";
      msg: "Invalid amount";
    },
    {
      code: 6002;
      name: "DeadlineExceeded";
      msg: "Deadline exceeded";
    },
    {
      code: 6003;
      name: "DeadlineNotReached";
      msg: "Deadline not reached";
    }
  ];
};

export const IDL: DeadManSwitch = {
  address: "DkNBjnt2ryrE2iEzaPsbjnSJGTBS3DwuaeoxvNiHkQTZ",
  metadata: {
    name: "dead_man_switch",
    version: "0.1.0",
    spec: "0.1.0",
  },
  instructions: [
    {
      name: "initialize",
      discriminator: [],
      accounts: [
        { name: "owner", writable: true, signer: true },
        { name: "escrow", writable: true, signer: false },
        { name: "systemProgram", writable: false, signer: false }
      ],
      args: [
        { name: "deadline", type: "i64" },
        { name: "beneficiary", type: "publicKey" },
        { name: "seed", type: "string" }
      ]
    },
    {
      name: "deposit",
      discriminator: [],
      accounts: [
        { name: "owner", writable: true, signer: true },
        { name: "escrow", writable: true, signer: false },
        { name: "systemProgram", writable: false, signer: false }
      ],
      args: [{ name: "amount", type: "u64" }]
    },
    {
      name: "checkin",
      discriminator: [],
      accounts: [
        { name: "owner", writable: true, signer: true },
        { name: "escrow", writable: true, signer: false }
      ],
      args: [{ name: "newDeadline", type: "i64" }]
    },
    {
      name: "claim",
      discriminator: [],
      accounts: [
        { name: "beneficiary", writable: true, signer: false },
        { name: "escrow", writable: true, signer: false },
        { name: "systemProgram", writable: false, signer: false }
      ],
      args: []
    },
    {
      name: "cancel",
      discriminator: [],
      accounts: [
        { name: "owner", writable: true, signer: true },
        { name: "escrow", writable: true, signer: false },
        { name: "systemProgram", writable: false, signer: false }
      ],
      args: []
    }
  ],
  accounts: [
    { name: "Escrow", discriminator: [] }
  ],
  types: [
    {
      name: "Escrow",
      type: {
        kind: "struct",
        fields: [
          { name: "owner", type: "publicKey" },
          { name: "beneficiary", type: "publicKey" },
          { name: "deadline", type: "i64" },
          { name: "lastCheckin", type: "i64" },
          { name: "bump", type: "u8" },
          { name: "seed", type: "string" }
        ]
      }
    }
  ],
  errors: [
    { code: 6000, name: "InvalidDeadline", msg: "Invalid deadline" },
    { code: 6001, name: "InvalidAmount", msg: "Invalid amount" },
    { code: 6002, name: "DeadlineExceeded", msg: "Deadline exceeded" },
    { code: 6003, name: "DeadlineNotReached", msg: "Deadline not reached" }
  ]
};

export interface EscrowAccountData {
  owner: PublicKey;
  beneficiary: PublicKey;
  deadline: BN;
  lastCheckin: BN;
  bump: number;
  seed: string;
}

export interface EscrowInfo {
  pubkey: PublicKey;
  account: EscrowAccountData;
  timeRemaining: string;
  balance: number;
  isOwner: boolean;
}
