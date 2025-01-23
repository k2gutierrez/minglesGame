"use client"

import { createContext, useState } from "react"

export const WalletContext = createContext();

export const WalletContextProvider = ({children}) => {
    let [isConnected, setIsConnected] = useState(false);
    let [userAddress, setUserAddress] = useState(null);
    let [signer, setSigner] = useState();
    let [provider, setProvider] = useState();
    let [location, setLocation] = useState("");
    let [tokenId, setTokenId] = useState(null);
    let [isAlive, setIsAlive] = useState(true);
    const [contract, setContract] = useState(null);

    return (
        <WalletContext.Provider 
            value={{
                isConnected,
                setIsConnected,
                userAddress,
                setUserAddress,
                signer,
                setSigner,
                provider,
                setProvider,
                location,
                setLocation,
                tokenId,
                setTokenId,
                isAlive,
                setIsAlive,
                contract,
                setContract
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}