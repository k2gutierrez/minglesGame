'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext } from 'react';
import mingle from "../../../../public/assets/1of1s.png";
import { GetUser } from "@/app/engine/engine";
import { EscapeChoice } from "@/app/engine/engine";
import { WalletContext } from "@/app/context/wallet";

export default function Survivor() {

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
    setTokenId
  } = useContext(WalletContext);

  const [user, setUser] = useState(GetUser(tokenId, provider))

  return (
    <>
      <div className="grid text-center mt-6">
        <div className={cls(styles.backColor, "grid justify-items-center text-center items-end rounded-3xl h-64 w-64 m-5")}>
        </div>
      </div>
      <p className="mt-2 text-black text-md font-[family-name:var(--font-hogfish)]">YOU'VE ESCAPED THE BASEMENT PRISON</p>
      <Image className="mt-3" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + tokenId + ".png"} alt="Mingle" width={60} height={60} />
      <p className="mt-5 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">Wait for the Raffle</p>
    </>
  )
}
