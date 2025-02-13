'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext, useState, useEffect } from 'react';
import { WalletContext } from "../context/wallet";
import prize from "../../../public/assets/prize.jpg";
import { ethers } from "ethers";
import { gameABI } from "../abis/gameABI";

export default function Login({ connect, getMingles }) {

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
    setMingle,
    mingle
  } = useContext(WalletContext);

  const [isPaused, setIsPaused] = useState(null)
  const [raiding, setRaiding] = useState(null)
  const [alive, setAlive] = useState(null)
  const [fallen, setFallen] = useState(null)
  const [escape, setEscape] = useState(null)

  useEffect(() => {
    if (isConnected) {
      check()
      GetPausedStatus()
    }

  }, [isConnected])

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
      <div className="grid text-center mt-10">
        <div className={cls(styles.marginBack, "z-10 grid justify-items-center text-center items-end h-40 w-40 mx-9")}>
          <Image className="rounded-2xl" src={prize} alt={prize} width={180} height={180} />
        </div>
        <div className={cls(styles.backColor, "z-0 grid justify-items-center text-center items-end rounded-2xl h-48 w-48 m-5")}>
          <p className="pt-20 text-black text-xs font-[family-name:var(--font-hogfish)]">MINGLES</p>
          <p className="text-xs text-white font-[family-name:var(--font-pressura)]">Worms Raid</p>
          <p className="px-5 mb-2 text-black text-xs font-[family-name:var(--font-pressura)]">
            Defeat the GIANT RAVEN
          </p>
          <p className="px-5 mb-2 text-black text-xs font-[family-name:var(--font-pressura)]">
            &
          </p>
          <p className="px-5 mb-2 text-black text-xs font-[family-name:var(--font-pressura)]">
            Win G's on APE #4427
          </p>
        </div>
      </div>
      <p className="px-5 mb-2 text-black text-sm font-[family-name:var(--font-pressura)]">
            Max. 200 Mingles per account
      </p>
      
      {alive == 0 && isPaused ?
        (
          <div className="grid text-center mt-1">
            <p className="my-5 text-black text-2xl font-[family-name:var(--font-hogfish)]">The Raven wins</p>
            <video className="px-5" width="600" height="600" autoPlay loop controls preload="none">
              <source src="/videos/Dead.mov" />
              Your browser does not support the video tag.
            </video>
            <p className="mt-5 text-black text-md font-[family-name:var(--font-pressura)]">Pathetic.</p>
            <p className="mt-2 text-black text-md font-[family-name:var(--font-pressura)]">You never stood a chance.</p>
            <p className="mt-4 text-black text-md font-[family-name:var(--font-pressura)]">Try again... if you dare!</p>
            <p className="mt-4 mb-5 text-black text-md font-[family-name:var(--font-pressura)]"><span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>WAIT</span> for the game to <span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>RESET</span></p>
          </div>
        ) : (
          userAddress != null ? (
            <div className="flex items-center justify-center">
              <button className={cls(styles.backColor, "my-8 text-base mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={getMingles} >Enlist Mingle</button>
              <button className={cls(styles.backColor, "my-8 text-base mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={() => setLocation("noMingle")} >Buy Mingle</button>
            </div>
          ) : (
            <>
            <p className="my-5 text-black text-md font-[family-name:var(--font-hogfish)]">DO YOU ACCEPT THE CALL?</p>
            <div className="flex items-center justify-center">
              <button className={cls(styles.backColor, "text-base mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={connect} >Yes</button>
              <button className={cls(styles.backColor, "text-base mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={() => setLocation("no")}>No</button>
            </div>
            </>
          )


        )
      }
      {isConnected &&
        (
          <>
            <div className="flex items-center justify-center">
              <button className={cls(styles.backColor, "my-3 text-base mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={() => setLocation("rules")} >RULES</button>
            </div>
            <div className="flex mb-5 items-center justify-center">
              <button className={cls(styles.backColor, "my-2 text-base mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={() => setLocation("board")} >Check the Playerboard</button>
            </div>
          </>
        )
      }
    </>
  )
}
