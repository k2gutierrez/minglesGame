'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import React, { useContext, useState, useEffect } from 'react';
import oneOnOne from "../../../public/assets/1of1s.png";
import { WalletContext } from "../context/wallet";
import { gameABI } from "../abis/gameABI";
import { ethers } from "ethers";

export default function Board() {

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
        setTokenId,
        isAlive,
        setIsAlive
    } = useContext(WalletContext);

    const [raiding, setRaiding] = useState(null)
    const [alive, setAlive] = useState(null)
    const [fallen, setFallen] = useState(null)
    const [escape, setEscape] = useState(null)
    const [mingles, setMingles] = useState(null)

    useEffect(() => {
        check()
        console.log(mingles)
    }, [])

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
            const survivors = gameContract.getSurvivors().then((value) => {
                let ar = []
                for (let i = 0; i < value.length; i++) {
                    ar.push(value[i])
                }
                console.log(ar)
                setMingles(ar)
            })

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className="text-center bg-black rounded-xl p-3 mt-10">
                <p className="text-white font-[family-name:var(--font-hogfish)]">The Heroes</p>
            </div>
            <div className="text-center mt-5">
                <p className="text-black font-[family-name:var(--font-pressura)]">Raiding: {raiding}</p>
                <p className="text-black font-[family-name:var(--font-pressura)]">Fallen: {fallen}</p>
                <p className="text-black text-lg font-[family-name:var(--font-pressura)]">Made it to the Escape Room: {escape}</p>
                <p className="text-black font-[family-name:var(--font-pressura)]">Alive: {alive}:</p>
            </div>
            <div className="text-center grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 mt-5">
                {mingles != null &&
                    (

                        mingles.map((v, k) => {
                            return (
                                <div key={k} className="rounded-lg border border-gray-400 font-[family-name:var(--font-hogfish)]">
                                    <Image src={"https://d9emswcmuvawb.cloudfront.net/PFP" + v + ".png"} alt={v} width={200} height={200} />
                                    <p className="mt-1">Mingle ID {v}</p>
                                </div>
                            )
                        })


                    )
                }
            </div>
        </>
    )
}
