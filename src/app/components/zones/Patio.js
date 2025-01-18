'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext, useEffect, useState } from 'react';
import { GetUser } from "@/app/engine/engine";
import { Choice } from "@/app/engine/engine";
import { WalletContext } from "@/app/context/wallet";
import { ethers } from "ethers";
import { gameABI } from "@/app/abis/gameABI";
import { toBytes } from "viem";

export default function Patio() {

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

  const choice1 = "main hall"
  const choice2 = "back door tunnels"

  async function Choice(_nft, _location) {
    if (tokenId == null) return
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT_SEPOLIA, gameABI, signer)
      const choiceToSurvive = await gameContract.choice(_nft, toBytes(_location, { size: 32 }))
      const res = await choiceToSurvive.wait()
      console.log(choiceToSurvive)
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  const c1 = async () => {
    Choice(tokenId, choice1)
  }

  const c2 = async () => {
    Choice(tokenId, choice2)
  }

  return (
    <>
      <div className="grid text-center mt-6">
        <div className={cls(styles.backColor, "grid justify-items-center text-center items-end rounded-3xl h-64 w-64 m-5")}>
        </div>
      </div>
      <p className="mt-2 text-black text-md font-[family-name:var(--font-hogfish)]">YOU'VE ENTERED THE PATIO</p>
      <Image className="mt-3" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + tokenId + ".png"} alt="Mingle" width={60} height={60} />
      <p className="mt-5 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">The raid has started. You entered the agave field. It's scary af.</p>
      <div className="mt-5 mb-10 flex items-center justify-center">
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={c1} >A. You spot a grand entrance with its doors slightly ajar.</button>
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={c2} >B. Shadows lead to a hidden pathway underground.</button>
      </div>
    </>
  )
}
