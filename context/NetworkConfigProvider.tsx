"use client";
import React, { createContext, FC, ReactNode, useContext, useState } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

interface NetworkConfig {
    network: WalletAdapterNetwork;
    setNetwork: (network: WalletAdapterNetwork) => void;
}

const NetworkConfigContext = createContext<NetworkConfig | undefined>(undefined);

export function useNetworkConfig(): NetworkConfig {
    const context = useContext(NetworkConfigContext);
    if (context === undefined) {
        throw new Error('useNetworkConfig must be used within a NetworkConfigProvider');
    }
    return context;
}

export const NetworkConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [network, setNetwork] = useState<WalletAdapterNetwork>(WalletAdapterNetwork.Devnet);
    
    return (
        <NetworkConfigContext.Provider value={{ network, setNetwork }}>
            {children}
        </NetworkConfigContext.Provider>
    );
};