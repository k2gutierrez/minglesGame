'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext, useState, useEffect } from 'react';
import { WalletContext } from "@/app/context/wallet";
import { ethers } from "ethers";
import { gameABI } from "@/app/abis/gameABI";
import { toBytes } from "viem";
import Loader from "../Loader";

export default function Hall3() {

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
  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)

  const choice1 = "private cava"
  const choice2 = "private cava"

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
      if (loc == "hall3"){
        setMessage("Mayahuel has given you a second chance to pass this stage!")
      }
      setLoading(false)
      setIsAlive(mstatus)
      setLocation(loc)
    }, 1500);
  }

  async function Choice(_nft, _location, _num) {
    if (tokenId == null) return
    setLoading(true)
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT_SEPOLIA, gameABI, signer)
      const choiceToSurvive = await gameContract.choice(_nft, toBytes(_location, { size: 32 }), _num, {
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
      //setIsAlive(mstatus)
      //setLocation(loc)
    } catch (e) {
      console.error(e)
    }
  }

  const c1 = async () => {
    Choice(tokenId, choice1, 20)
  }

  const c2 = async () => {
    Choice(tokenId, choice2, 10)
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
      {loading == true ? (
        <Loader />
      ) : (
        <>
          <div className="grid text-center mt-6">
            <div className={cls(styles.backColor, "grid justify-items-center text-center items-end rounded-3xl h-64 w-64 m-5")}>
            </div>
          </div>
          {message != "" && (<p className="mt-2 green-600 text-md font-[family-name:var(--font-hogfish)]">{message}</p>)}
          <p className="mt-2 text-black text-md font-[family-name:var(--font-hogfish)]">{message == "" ? "YOU'VE ENTERED HALL 3" : "YOU'RE STILL IN HALL 3"}</p>
          <Image className="mt-3" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + tokenId + ".png"} alt="Mingle" width={60} height={60} />
          <p className="mt-5 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">
            Dark and tight, with faint noises ahead that scream trouble.
          </p>
          <div className="mt-5 mb-10 flex items-center justify-center">
            <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={c1} >
              A. A hidden path leads to a heavy, vault-like door.
            </button>
            <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={c2} >
              B. A faint light flickers at the end of the hall.
            </button>
          </div>
        </>
      )

      }
    </>
  )
}
