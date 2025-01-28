'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext, useState } from 'react';
import { WalletContext } from "../context/wallet";
import prize from "../../../public/assets/prize.jpg";

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

  return (
    <>
      <div className="grid text-center mt-10">
        <div className={cls(styles.marginBack, "z-10 grid justify-items-center text-center items-end h-40 w-40 mx-9")}>
          <Image className="rounded-2xl" src={prize} alt={prize} width={180} height={180} />
        </div>
        <div className={cls(styles.backColor, "z-0 grid justify-items-center text-center items-end rounded-2xl h-48 w-48 m-5")}>
          <p className="pt-10 text-black text-xs font-[family-name:var(--font-hogfish)]">MINGLES</p>
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
      <p className="my-5 text-black text-md font-[family-name:var(--font-hogfish)]">DO YOU ACCEPT THE CALL?</p>
      {userAddress != null ? (
        <div className="flex items-center justify-center">
          <button className={cls(styles.backColor, "my-8 text-base mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={getMingles} >Enlist Mingle</button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <button className={cls(styles.backColor, "text-base mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={connect} >yes</button>
          <button className={cls(styles.backColor, "text-base mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={() => setLocation("no")}>no</button>
        </div>
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
