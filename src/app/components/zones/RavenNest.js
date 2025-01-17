'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext } from 'react';
import mingle from "../../../../public/assets/1of1s.png";
import { GetUser } from "@/app/engine/engine";
import { Choice } from "@/app/engine/engine";
import { WalletContext } from "@/app/context/wallet";

export default function RavenNest() {

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

  const onlyChoice = "basement prison"

  useEffect(() => {
    if (user.location == onlyChoice) {
      setLocation(user.location)
    }

  }, [user])

  const theChoice = async () => {
    let getChoice = await Choice(tokenId, onlyChoice, signer)
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
      <p className="mt-2 text-black text-md font-[family-name:var(--font-hogfish)]">YOU'VE ENTERED THE RAVEN NEST</p>
      <Image className="mt-3" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + tokenId + ".png"} alt="Mingle" width={60} height={60} />
      <p className="mt-5 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">
        You’re in the Giant Raven’s lair—talons scrape, shadows move.
      </p>
      <div className="mt-5 mb-5 flex items-center justify-center">
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={theChoice} >
          A. Sharp talons glint from the shadows above.
        </button>
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={theChoice} >
          B. Wingbeats echo faintly around you.
        </button>
      </div>
      <div className="mt-5 mb-5 flex items-center justify-center">
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={theChoice} >
          C. Glowing eyes track your every step.
        </button>
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={theChoice} >
          D. Feathers and decay fill the air ominously.
        </button>
      </div>
      <div className="mt-5 mb-10 flex items-center justify-center">
        <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl")} onClick={theChoice} >
          E. The room vibrates slightly, as whispers surround you.
        </button>
      </div>
    </>
  )
}
