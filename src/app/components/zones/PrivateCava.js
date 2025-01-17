'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext } from 'react';
import mingle from "../../../../public/assets/1of1s.png";
import { GetUser } from "@/app/engine/engine";
import { Choice } from "@/app/engine/engine";
import { WalletContext } from "@/app/context/wallet";

export default function PrivateCava() {

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

  const choice1 = "raven nest"
  const choice2 = "raven nest"

  useEffect(() => {
    if (user.location == choice1) {
      setLocation(user.location)
    }

    if (user.location == choice2) {
      setLocation(user.location)
    }

  }, [user])

  const firstChoice = async () => {
    let getChoice = await Choice(tokenId, choice1, signer)
    if (getChoice == true) {
      const user = await GetUser(tokenId, provider)
      setUser(user)
    }
  }

  const secondChoice = async () => {
    let getChoice = await Choice(tokenId, choice2, signer)
    if (getChoice == true) {
      const user = await GetUser(tokenId, provider)
      setUser(user)
    }
  }

  return (
    <>
      <div className="grid text-center mt-6">
        <div className={cls(styles.backColor, "grid justify-items-center text-center items-end rounded-3xl h-64 w-64 m-5")}>
        </div>
      </div>
      <p className="mt-2 text-black text-md font-[family-name:var(--font-hogfish)]">YOU'VE ENTERED THE PRIVATE CAVA</p>
      <Image className="mt-3" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + tokenId + ".png"} alt="Mingle" width={60} height={60} />
      <p className="mt-5 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">
        Glimmering bottles line the walls, but whispers make it eerie.
      </p>
      <div className="mt-5 mb-10 flex items-center justify-center">
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={firstChoice} >
          A. Shelves glimmer, but something moves in the shadows.
        </button>
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={secondChoice} >
          B. The room is silent, yet faint vibrations linger.
        </button>
      </div>
    </>
  )
}
