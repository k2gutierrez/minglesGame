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
import { gameABI } from "../abis/gameABI";
import { ethers } from "ethers";

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

    const [isPaused, setIsPaused] = useState(null)
    const [raiding, setRaiding] = useState(null)
    const [alive, setAlive] = useState(null)
    const [fallen, setFallen] = useState(null)
    const [escape, setEscape] = useState(null)

    useEffect(() => {
        check()
        GetPausedStatus()
    }, [])

    async function GetPausedStatus() {
        try {
            const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT_SEPOLIA, gameABI, provider)
            const getPausedStatus = await gameContract.getGamePausedStatus()
            setIsPaused(getPausedStatus)
            console.log("function: ", getPausedStatus)

        } catch (e) {
            console.error(e)
        }
    }

    async function check() {
        try {
            const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT_SEPOLIA, gameABI, provider)
            const raiding = await gameContract.getAmountOfRegisteredUsers()
            console.log(raiding)
            setRaiding(raiding)
            const fallen = await gameContract.getCaidos()
            console.log(fallen)
            setFallen(fallen)
            const escape = await gameContract.getSurvivorsLength()
            console.log(escape)
            setEscape(escape)
            setAlive(ethers.toNumber(raiding) - ethers.toNumber(fallen))

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            {alive == 0 && isPaused ? (
                <div className="grid text-center mt-1">
                    <p className="my-5 text-black text-2xl font-[family-name:var(--font-hogfish)]">The Raven wins</p>
                    <video className="px-5" width="600" height="600" autoPlay loop controls preload="none">
                        <source src="/videos/Dead.mov" />
                        Your browser does not support the video tag.
                    </video>
                    <p className="mt-5 text-black text-md font-[family-name:var(--font-pressura)]">Pathetic.</p>
                    <p className="mt-2 text-black text-md font-[family-name:var(--font-pressura)]">You never stood a chance.</p>
                    <p className="mt-4 text-black text-md font-[family-name:var(--font-pressura)]">Try again... if you dare!</p>
                    <p className="mt-4 text-black text-md font-[family-name:var(--font-pressura)]"><span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>WAIT</span> for the game to <span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>RESET</span></p>
                </div>
            ) : (
                <>
                    <div className="text-center bg-black rounded-xl p-2 mt-10">
                        <p className="text-white font-[family-name:var(--font-pressura)]">Pick your Mingle</p>
                    </div>
                    <div className="text-center grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 mt-5 mb-8">
                        {mingle && (
                            mingle.tokens.map((v, k) => {

                                const mingleInfo = v.token.tokenId

                                return (
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
        </>
    )
}
