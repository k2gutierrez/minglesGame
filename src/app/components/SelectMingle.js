'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from "../context/wallet";
import { GetMingleMetadata } from "../engine/engine";
import { mingleType } from "../engine/engine";
import { Sign } from "../engine/engine";

export default function SelectMingle({ mingle }) {

    const {
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
        setTokenId
    } = useContext(WalletContext);

    const [token, setToken] = useState(null)

    useEffect(() => {
        if (token != null){
            setLocation("patio")
        }

    }, [token])

    return (
        <>
            <div className="text-center bg-black rounded-xl p-2 mt-10">
                <p className="text-white font-[family-name:var(--font-pressura)]">Pick your Mingle</p>
            </div>
            <div className="text-center grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 mt-5">
                {
                    mingle != null && (
                        mingle.tokens.map((v, k) => {
                            const getMingleData = async () => {
                                let type = await GetMingleMetadata(v.token.tokenId, provider)
                                let surviveChance = await mingleType(type)
                                let sign = await Sign(v.token.tokenId, surviveChance, signer)
                                if (sign == true){
                                    setToken(v.token.tokenId)
                                    setTokenId(v.token.tokenId)
                                } else {
                                    window.alert("Something went wrong")
                                }
                                
                            }
                            return (
                                <div key={k} className="rounded-lg border border-gray-400 font-[family-name:var(--font-hogfish)]">
                                    <Image src={"https://d9emswcmuvawb.cloudfront.net/PFP" + v.token.tokenId + ".png"} alt={v.token.tokenId} width={200} height={200} />
                                    <p className="pt-1"># {v.token.tokenId} <span className="text-green-500">Alive {""}</span></p>
                                    <button type="button" onClick={getMingleData} className="border border-1 border-black px-1 pt-2 rounded-xl mb-1 bg-slate-300">Register</button>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </>
    )
}
