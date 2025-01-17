'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext } from 'react';
import { WalletContext } from "../context/wallet";

export default function No() {

  const {
    setLocation,
  } = useContext(WalletContext);

  return (
    <>
      <div className="grid text-center mt-10">
        <div className={cls(styles.marginBack, "z-10 grid justify-items-center border border-black text-center items-end rounded-2xl h-40 w-40 mx-9")}>

        </div>
        <div className={cls(styles.backColor, "z-0 grid justify-items-center text-center rounded-2xl h-48 w-48 m-5")}>
          <p className="pt-10 mt-10 text-black text-xs font-[family-name:var(--font-hogfish)]">Stop being a pussy</p>
        </div>
      </div>
      <p className="my-5 text-black text-md font-[family-name:var(--font-hogfish)]">READY?</p>
      <div className="flex items-center justify-center">
        <button className={cls(styles.backColor, "my-10 text-base mx-5 w-32 p-1 rounded-xl")} onClick={() => setLocation("")} >okay I'll go</button>
      </div>
    </>
  )
}
