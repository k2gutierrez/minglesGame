'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext, useState, useEffect } from 'react';
import { WalletContext } from "@/app/context/wallet";
import { ethers } from "ethers";
import { gameABI } from "@/app/abis/gameABI";
import { toBytes } from "viem";

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
    setTokenId,
    isAlive,
    setIsAlive
  } = useContext(WalletContext);

  const [loc, setLoc] = useState("")
  const [id, setId] = useState(0)
  const [mstatus, setMstatus] = useState()
  const [lvl, setLvl] = useState(0)
  const [cstage, setCstage] = useState(0)
  const [crevive, setCrevive] = useState()
  const [trigger, setTrigger] = useState(false)

  const [winner, setWinner] = useState(null)
  let [counter, setCounter] = useState(0)

  useEffect(() => {
    GetUser(tokenId)
    increase()
    if (counter > 0){
      check(tokenId)
    }
  
  }, [counter])

  function increase() {
    setTimeout(() => {
      setCounter(counter + 1)
    }, 5000);
    console.log(counter)
    
  }

  async function check(nft) {
    if (nft == null) return
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT_SEPOLIA, gameABI, provider)
      const checkWinner = await gameContract.on(gameContract.filters.WinnerSelected, (winner, event) => {
        setWinner(winner)
        //console.log(event)
      })
      const checkWinnerAgain = await gameContract.queryFilter(
        gameContract.filters.WinnerSelected,
        0,
        'latest'
      )
      checkWinnerAgain.forEach(event => {
        setWinner(event.args[0])
        console.log(event.args[0])
      })

    } catch (e) {
      console.error(e)
    }
  }

  async function GetUser(nft) {
    if (nft == null) return
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT_SEPOLIA, gameABI, provider)
      const getUser = await gameContract.getUser(nft)
      let loc = ethers.decodeBytes32String(getUser[2])
      setLoc(loc)
      let id = ethers.toNumber(getUser[0])
      setId(id)
      let mStatus = getUser[1]
      setMstatus(mStatus)
      let lvl = ethers.toNumber(getUser[3])
      setLvl(lvl)
      let Cstage = ethers.toNumber(getUser[4])
      setCstage(Cstage)
      let Crevive = getUser[5]
      setCrevive(Crevive)

    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="grid text-center mt-6">
        <div className={cls(styles.backColor, "grid justify-items-center text-center items-end rounded-3xl h-64 w-64 m-5")}>
        </div>
      </div>
      <p className="mt-2 text-black text-md font-[family-name:var(--font-hogfish)]">YOU'VE ESCAPED THE BASEMENT PRISON</p>
      <Image className="mt-3" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + tokenId + ".png"} alt="Mingle" width={60} height={60} />
      { winner == null ?
        (<p className="mt-5 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">Wait for the Raffle</p>) :
        (
          <>
            <p className="mt-8 text-black text-md font-[family-name:var(--font-hogfish)]">The winner is!</p>
            <Image className="mt-3" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + winner + ".png"} alt="Mingle" width={60} height={60} />
            <p className="mt-1 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">ID # {winner}</p>
          </>
        )
      }
    </>
  )
}
