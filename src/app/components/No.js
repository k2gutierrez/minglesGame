'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext } from 'react';
import { WalletContext } from "../context/wallet";
import cat from "../../../public/assets/cat.jpeg";

export default function No() {

  const {
    setLocation,
  } = useContext(WalletContext);

  return (
    <>
      <div className="grid text-center mt-10">
        <div className={cls(styles.marginBack, "z-10 grid justify-items-center text-center items-end h-40 w-40 mx-9")}>
          <Image className="rounded-2xl" src={cat} alt={cat} width={180} height={180} />
        </div>
        <div className={cls(styles.backColor, "z-0 grid justify-items-center text-center rounded-2xl h-48 w-48 m-5")}>
          <p className="pt-10 mt-10 text-black text-xs font-[family-name:var(--font-hogfish)]">Stop being a pussy</p>
        </div>
      </div>
      <p className="my-5 text-black text-md font-[family-name:var(--font-hogfish)]">READY?</p>
      <div className="flex items-center justify-center">
        <button className={cls(styles.backColor, "my-10 text-base mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={() => setLocation("")} >okay I'll go</button>
      </div>
    </>
  )
}
