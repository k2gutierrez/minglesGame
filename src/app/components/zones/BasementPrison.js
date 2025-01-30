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

export default function BasementPrison() {

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

  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)
  const [isPaused, setIsPaused] = useState(GetPausedStatus)
  let [counter, setCounter] = useState(0)

  const onlyChoice = "survivors"

  useEffect(() => {
    GetUser(tokenId)
    GetPausedStatus()
    console.log(counter)
    if (counter > 0) {
      setTimeout(() => {
        check(tokenId)
      }, 1000);
    }

  }, [counter])

  async function check(nft) {
    GetUser(nft)
    setTimeout(() => {
      if (loc == "basement prison") {
        setMessage("Mayahuel has given you a second chance to pass this stage!")
        setLoading(false)
      }

    }, 2000);
  }

  function increase() {
    setCounter(counter + 1)
  }

  async function Choice(_nft, _location) {
    if (tokenId == null) return
    setLoading(true)
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT_SEPOLIA, gameABI, signer)
      const choiceToSurvive = await gameContract.escapeChoice(_nft, toBytes(_location, { size: 32 }), {
        gasLimit: 3000000, // or a dynamic estimate
        //gasPrice: ethers.parseUnits("10", "gwei")
      })
      const res = await choiceToSurvive.wait()
      increase()

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
      if (counter > 0) {
        setLocation(loc)
      }

    } catch (e) {
      console.error(e)
    }
  }

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

  return (
    <>
      {loading == true ? (
        <Loader />
      )
        : (<>
          <div className="grid text-center mt-6">
            <video className="px-5" width="600" height="600" autoPlay loop controls preload="none">
              <source src="/videos/Escape.mov" />
              Your browser does not support the video tag.
            </video>
          </div>
          {message != "" && (<p className="mt-2 text-red-600 text-md font-[family-name:var(--font-hogfish)]">You died! but...</p>)}
          {message != "" && (<p className="mt-1 mx-10 text-green-600 text-md font-[family-name:var(--font-hogfish)]">{message}</p>)}
          <p className="mt-8 text-black text-md font-[family-name:var(--font-hogfish)]">{message == "" ? "YOU'VE ENTERED THE BASEMENT PRISON" : "YOU'RE STILL IN THE BASEMENT PRISON"}</p>
          <Image className="mt-3 rounded-2xl" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + tokenId + ".png"} alt="Mingle" width={60} height={60} />
          <p className="mt-5 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">You have found all the mingles, free them and escape.</p>
          <p className="mt-5 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]"><span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>WAIT</span> while other heroes get here before you attempt to escape.</p>
          <div className="mt-5 mb-10 flex items-center justify-center">
            {isPaused == true ? (
              <button type="button" className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={c1} >
                Escape
              </button>
            ) : (
              <></>
            )
            }
          </div>
        </>)}
    </>
  )
}
