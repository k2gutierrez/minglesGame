'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext, useState } from 'react';
import { WalletContext } from "@/app/context/wallet";
import { TwitterShareButton } from "react-twitter-embed";

export default function Die() {

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

  const [copied, setCopied] = useState(false)

  const getImage = async () => {
    const imge = document.getElementById("mingle")
    const data = await fetch(imge.src)
    const blob = await data.blob()

    try {
      navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        })
      ])
      setCopied(true)
      console.log("Success")

    } catch (e) {
      console.error(e)
    }

  }

  return (
    <>
      <div className="grid text-center mt-10">
        <video className="px-5" width="600" height="600" autoPlay loop controls preload="none">
          <source src="/videos/Dead.mov" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="mt-5 text-black text-md font-[family-name:var(--font-hogfish)]">YOU DIED</p>
      <Image id="mingle" className="mt-4" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + tokenId + ".png"} alt="Mingle" width={60} height={60} />
      <p className="my-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">Want to try again?</p>
      <div className="flex items-center justify-center">
        <button className={cls(styles.backColor, "text-base mx-5 w-32 p-1 rounded-xl")} onClick={() => setLocation("mingles")} >yes</button>
        {copied == false ?
          (
            <button className={cls(styles.backColor, "text-base mx-5 w-32 p-1 rounded-xl")} onClick={getImage} >Copy to Share on X</button>
          ) : (
            <TwitterShareButton
                  url="I tried the Mingle Raid!"

                />
          )
        }
      </div>
    </>
  )
}
