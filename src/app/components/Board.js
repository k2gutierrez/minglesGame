'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import React, { useContext, useState, useEffect } from 'react';
import oneOnOne from "../../../public/assets/1of1s.png";
import { WalletContext } from "../context/wallet";
import { gameABI } from "../abis/gameABI";
import { ethers } from "ethers";
import { toBytes } from "viem";

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
        setIsAlive,
        collection,
        setCollection
    } = useContext(WalletContext);

    const [raiding, setRaiding] = useState(null)
    const [alive, setAlive] = useState(null)
    const [fallen, setFallen] = useState(null)
    const [escape, setEscape] = useState(null)
    const [mingles, setMingles] = useState(null)
    let [aliveMingles, setAliveMingles] = useState(null)

    const [winner, setWinner] = useState(null)

    const [winnerCollection, setWinnerCollection] = useState("")

    useEffect(() => {

        setTimeout(() => {
            check()
            checkWinner()
        }, 1000);

    }, [])

    useEffect(() => {

        if (mingles != null) {
            GetUser(mingles, toBytes(collection, { size: 32 }))
        }

    }, [mingles])

    async function check() {
        try {
            const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, provider)
            const raiding = await gameContract.getAmountOfRegisteredUsers()
            console.log(raiding)
            setRaiding(raiding)
            const fallen = await gameContract.getDeadNftsLength()
            console.log(fallen)
            setFallen(fallen)
            const escape = await gameContract.getMinglesForRaffleLength()
            console.log(escape)
            setEscape(escape)
            setAlive(ethers.toNumber(raiding) - ethers.toNumber(fallen))
            const survivors = gameContract.getRegisteredUsersCollection().then((value) => { // getMinglesForRaffle
                let ar = []
                for (let i = 0; i < value.length; i++) {
                    let base = {
                        token: value[i][0],
                        collection: value[i][6]
                    }
                    ar.push(base)
                    //ar.push(value[i])

                }
                console.log("whole array", ar)
                console.log("Result", ar[0][1])
                setMingles(ar)
            })

        } catch (e) {
            console.error(e)
        }
    }

    

    async function GetUser(mingles, collection) {
        let arr = []
        const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, provider)
        for (let i = 0; i < mingles.length; i++) {
            const getUser = await gameContract.getUser(mingles[i].token, mingles[i].collection)
            let mStatus = getUser[1]
            if (mStatus != 4) {
                let base = {
                    token: getUser[0],
                    collection: getUser[6]
                }
                arr.push(base)
                //arr.push(getUser[0])
            }
        }
        setAliveMingles(arr)

    }

    async function checkWinner() {
        try {
            const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, provider)
            const checkWinner = await gameContract.on(gameContract.filters.WinnerSelected, (winner, event) => {
                setWinner(event)
                //console.log(event)
            })
            const checkWinnerAgain = await gameContract.queryFilter(
                gameContract.filters.WinnerSelected,
                0,
                'latest'
            )
            checkWinnerAgain.forEach(event => {
                setWinner(event.args[0])
                console.log(event.args[0])
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
            {winner != null &&
                (
                    <>
                        <p className="mt-8 text-black text-md font-[family-name:var(--font-hogfish)]">The winner is!</p>
                        <Image className="mt-3 rounded-2xl" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + winner + ".png"} alt="Mingle" width={150} height={150} />
                        <p className="mt-1 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">ID # {winner}</p>
                    </>
                )
            }
            <div className="text-center grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 mt-5">
                {aliveMingles != null && (
                    aliveMingles.map((v, k) => {

                        return (
                            
                            <div key={k} className="rounded-lg border border-gray-400 font-[family-name:var(--font-hogfish)]">
                                {v.collection == "0x636f6c6c656374696f6e31000000000000000000000000000000000000000000" && (
                                    <Image className="mt-3 rounded-2xl" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + v.token + ".png"} alt="Mingle" width={200} height={200} />
                                )}
                                {v.collection == "0x636f6c6c656374696f6e32000000000000000000000000000000000000000000" && (
                                    <Image className="mt-3 rounded-2xl" src={"https://bafybeifrjmhpuf34cv6sy4lqhs5gmmusznpunyfik3rqoqfi73abpcpnbi.ipfs.w3s.link/" + v.token + ".jpg"} alt="Mingle" width={200} height={200} />
                                )}
                                <p className="mt-1">Mingle ID {v.token}</p>
                                <p className="mt-1">{<span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>Alive</span>}</p>
                            </div>

                        )
                    })

                )

                }
            </div>
        </>
    )
}
