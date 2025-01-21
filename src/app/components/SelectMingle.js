'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from "../context/wallet";
import { GetMingleMetadata } from "../engine/engine";
import { mingleType } from "../engine/engine";
import { Sign } from "../engine/engine";
import { GetUser } from "../engine/engine";
import { hexToString } from "viem";
import Card from "./Card";

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

    //let [token, setToken] = useState(false)

    {/*useEffect(() => {
        if (mingle) {
            setToken(true)
        }

    }, [token])

    const getMingleData = async (id) => {

        let type = await GetMingleMetadata(id, provider)
        let surviveChance = await mingleType(type)
        try {
            let sign = await Sign(id, surviveChance, signer)
            //setToken(id)
            //setTokenId(id)
        } catch (e) {
            console.error(e)
            window.alert(e)
        }
    }*/}

    return (
        <>
            <div className="text-center bg-black rounded-xl p-2 mt-10">
                <p className="text-white font-[family-name:var(--font-pressura)]">Pick your Mingle</p>
            </div>
            <div className="text-center grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 mt-5 mb-8">
                { mingle && (
                    mingle.tokens.map((v, k) => {

                        const mingleInfo = v.token.tokenId
                        
                        return(
                            <Card key={k} nft={mingleInfo} />
                        )
                    }
                )
                )
                }
            </div>
        </>
    )
}
