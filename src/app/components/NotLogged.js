'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import React from 'react';

export default function NotLogged( backToLogin ) {
  return (
    <>
      <p className="my-10 text-black text-md font-[family-name:var(--font-hogfish)]">Your are not connected</p>
      <div className="flex items-center justify-center">
        <button className={cls(styles.backColor, "my-10 text-base mx-5 w-32 p-1 rounded-xl")} onClick={backToLogin} >Back to Login</button>
      </div>
    </>
  )
}
