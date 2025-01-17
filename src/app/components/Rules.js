'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext } from 'react';
import { WalletContext } from "../context/wallet";
import { BrowserProvider } from "ethers";
import { ethers } from "ethers";
import { ABI } from "../abis/mingleABI";
import { keccak256, toBytes } from "viem";

export default function Rules() {

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
      <div className="mx-10 my-5 p-2 text-center">
      <p className="mb-2text-black text-md font-[family-name:var(--font-hogfish)]">RULES</p>
      <p className="mb-2 text-black text-sm font-[family-name:var(--font-pressura)]">
        Each Mingle can raid only once.</p>
      <p className="mb-2 text-black text-sm font-[family-name:var(--font-pressura)]">
        If it dies, it cannot participate again-nor can anyone else use it.</p>
      <p className="mb-2 text-black text-sm font-[family-name:var(--font-pressura)]">
        Mayahuel may revive your Mingle once, depending on rarity.</p>
      <p className="mb-2 text-black text-sm font-[family-name:var(--font-pressura)]">
        Fully on-chain: every decision creates a new transaction.</p>
      <p className="mb-2 text-black text-sm font-[family-name:var(--font-pressura)]">
        The last hero standing wins the NFT prize automatically.</p>
      <p className="mb-2 text-black text-sm font-[family-name:var(--font-pressura)]">
        If no one survives, the game restarts, and the prize returns to the pool.</p>
      </div>
      <div className="flex items-center justify-center">
        <button className={cls(styles.backColor, "text-sm mx-5 w-32 p-1 rounded-xl")}>Pick your mingle</button>
      </div>
      <div className="flex items-center justify-center">
        <button className={cls(styles.backColor, "my-5 text-sm mx-5 w-32 p-1 rounded-xl")}>check the playerboard</button>
      </div>
    </>
  )
}
