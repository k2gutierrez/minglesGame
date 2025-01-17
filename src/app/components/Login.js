'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext, useState } from 'react';
import { WalletContext } from "../context/wallet";

export default function Login({connect, getMingles}) {

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
        <div className={cls(styles.marginBack, "z-10 grid justify-items-center border border-black text-center items-end rounded-2xl h-40 w-40 mx-9")}>

        </div>
        <div className={cls(styles.backColor, "z-0 grid justify-items-center text-center items-end rounded-2xl h-48 w-48 m-5")}>
          <p className="pt-10 text-black text-xs font-[family-name:var(--font-hogfish)]">MINGLES</p>
          <p className="text-xs text-white font-[family-name:var(--font-pressura)]">Worms Raid</p>
          <p className="px-5 mb-2 text-black text-xs font-[family-name:var(--font-pressura)]">Your mission is to defeat the raven.</p>
        </div>
      </div>
      <p className="my-5 text-black text-md font-[family-name:var(--font-hogfish)]">DO YOU ACCEPT THE CALL?</p>
      {userAddress != null ? (
        <div className="flex items-center justify-center">
        <button className={cls(styles.backColor, "my-8 text-base mx-5 w-32 p-1 rounded-xl")} onClick={getMingles} >Enlist Mingle</button>
      </div>
      ):(
        <div className="flex items-center justify-center">
          <button className={cls(styles.backColor, "text-base mx-5 w-32 p-1 rounded-xl")} onClick={connect} >yes</button>
          <button className={cls(styles.backColor, "text-base mx-5 w-32 p-1 rounded-xl")} onClick={() => setLocation("no")}>no</button>
      </div>
      )

      }
      <div className="flex items-center justify-center">
        <button className={cls(styles.backColor, "my-8 text-base mx-5 w-32 p-1 rounded-xl")}>check the playerboard</button>
      </div>
    </>
  )
}
