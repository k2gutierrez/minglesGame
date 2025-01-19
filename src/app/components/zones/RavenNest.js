'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext, useState, useEffect } from 'react';
import { WalletContext } from "@/app/context/wallet";
import { ethers } from "ethers";
import { gameABI } from "@/app/abis/gameABI";
import { toBytes } from "viem";

export default function RavenNest() {

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

  const [loc, setLoc] = useState("")
  const [id, setId] = useState(0)
  const [mstatus, setMstatus] = useState()
  const [lvl, setLvl] = useState(0)
  const [cstage, setCstage] = useState(0)
  const [crevive, setCrevive] = useState()
  const [trigger, setTrigger] = useState(false)

  const onlyChoice = "basement prison"

  useEffect(() => {
    GetUser(tokenId)
    if (trigger == true) {
      check()
    }

  }, [trigger])

  async function check() {
    let res = await GetUser(tokenId)
    console.log(res)
    setTimeout(() => {
      setIsAlive(mstatus)
      setLocation(loc)
    }, 2000);
  }

  async function Choice(_nft, _location) {
    if (tokenId == null) return
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT_SEPOLIA, gameABI, signer)
      const choiceToSurvive = await gameContract.choice(_nft, toBytes(_location, { size: 32 }), {
              gasLimit: 3000000, // or a dynamic estimate
              gasPrice: ethers.parseUnits("10", "gwei")
          })
      const res = await choiceToSurvive.wait()
      console.log("choiceToSurvive", choiceToSurvive)
      console.log("res: ", res)
      await GetUser(tokenId)
      console.log(mstatus)
      console.log(loc)
      setTrigger(true)
      setIsAlive(mstatus)
      setLocation(loc)
    } catch (e) {
      console.error(e)
    }
  }

  const c1 = async () => {
    Choice(tokenId, onlyChoice)
  }

  async function GetUser(nft) {
    if (nft == null) return
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT_SEPOLIA, gameABI, provider)
      const getUser = await gameContract.getUser(nft)
      let loc = ethers.decodeBytes32String(getUser[2])
      setLoc(loc)
      let id = ethers.toNumber(getUser[0])
      setId(id)
      let mStatus = getUser[1]
      setMstatus(mStatus)
      let lvl = ethers.toNumber(getUser[3])
      setLvl(lvl)
      let Cstage = ethers.toNumber(getUser[4])
      setCstage(Cstage)
      let Crevive = getUser[5]
      setCrevive(Crevive)

    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="grid text-center mt-6">
        <div className={cls(styles.backColor, "grid justify-items-center text-center items-end rounded-3xl h-64 w-64 m-5")}>
        </div>
      </div>
      <p className="mt-2 text-black text-md font-[family-name:var(--font-hogfish)]">YOU'VE ENTERED THE RAVEN NEST</p>
      <Image className="mt-3" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + tokenId + ".png"} alt="Mingle" width={60} height={60} />
      <p className="mt-5 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">
        You’re in the Giant Raven’s lair—talons scrape, shadows move.
      </p>
      <div className="mt-5 mb-5 flex items-center justify-center">
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={c1} >
          A. Sharp talons glint from the shadows above.
        </button>
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={c1} >
          B. Wingbeats echo faintly around you.
        </button>
      </div>
      <div className="mt-5 mb-5 flex items-center justify-center">
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={c1} >
          C. Glowing eyes track your every step.
        </button>
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={c1} >
          D. Feathers and decay fill the air ominously.
        </button>
      </div>
      <div className="mt-5 mb-10 flex items-center justify-center">
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={c1} >
          E. The room vibrates slightly, as whispers surround you.
        </button>
      </div>
    </>
  )
}
