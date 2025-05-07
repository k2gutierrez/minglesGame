'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import { React, useContext, useState, useEffect } from 'react';
import { WalletContext } from "@/app/context/wallet";
import { ethers } from "ethers";
import { gameABI } from "@/app/abis/gameABI";
import { toBytes } from "viem";
import Loader from "../Loader";

//BASE
export default function DistilleryRoom() {

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
    setIsAlive,
    collection,
    setCollection
  } = useContext(WalletContext);

  const [loc, setLoc] = useState("")
  const [id, setId] = useState(0)
  const [mstatus, setMstatus] = useState()
  const [lvl, setLvl] = useState(0)
  const [cstage, setCstage] = useState(0)
  const [crevive, setCrevive] = useState()

  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)
  let [counter, setCounter] = useState(0)

  const choice1 = "hall1"
  const choice2 = "hall2"

  useEffect(() => {
    GetUser(tokenId, collection)
    console.log(counter)
    if (counter > 0) {
      setTimeout(() => {
        check(tokenId, collection)
      }, 1000);
    }

  }, [counter])

  async function check(nft, collection) {
    GetUser(nft, collection)
    setTimeout(() => {
      if (loc == "distillery room") {
        setMessage("Mayahuel has given you a second chance to pass this stage!")
        setLoading(false)
      }

    }, 2000);
  }

  function increase() {
    setCounter(counter + 1)
  }

  async function Choice(_nft, _location, _collection, _num) {
    if (tokenId == null) return
    setLoading(true)
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, signer)
      const choiceToSurvive = await gameContract.choice(_nft, toBytes(_location, { size: 32 }), toBytes(_collection, { size: 32 }), _num, {
        gasLimit: 3000000, // or a dynamic estimate
        //gasPrice: ethers.parseUnits("10", "gwei")
      })
      const res = await choiceToSurvive.wait()
      increase()

    } catch (e) {
      console.error(e)
    }
  }

  const c1 = async () => {
    Choice(tokenId, choice1, collection, 0)
  }

  const c2 = async () => {
    Choice(tokenId, choice2, collection, 1)
  }

  async function GetUser(nft, collection) {
    if (nft == null) return
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, provider)
      const getUser = await gameContract.getUser(nft, collection)
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
      setCollection(getUser[6])
      if (counter > 0) {
        setLocation(loc)
      }

    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      {loading == true ?
        (
          <Loader />
        ) : (
          <>
            <div className="grid text-center mt-6">
              <video className="px-5" width="600" height="600" autoPlay loop controls preload="none">
                <source src="/videos/Distillery_Room.mov" />
                Your browser does not support the video tag.
              </video>
            </div>
            {message != "" && (<p className="mt-2 text-red-600 text-md font-[family-name:var(--font-hogfish)]">You died! but...</p>)}
            {message != "" && (<p className="mt-1 mx-10 text-green-600 text-md font-[family-name:var(--font-hogfish)]">{message}</p>)}
            <p className="mt-8 text-black text-md font-[family-name:var(--font-hogfish)]">{message == "" ? "YOU'VE ENTERED THE DISTILERY ROOM" : "YOU'RE STILL IN THE DISTILERY ROOM"}</p>
            {collection == "collection1" && (
              <Image className="mt-3 rounded-2xl" src={"https://d9emswcmuvawb.cloudfront.net/PFP" + tokenId + ".png"} alt="Mingle" width={60} height={60} />
            )}
            {collection == "collection2" && (
              <Image className="mt-3 rounded-2xl" src={"https://bafybeifrjmhpuf34cv6sy4lqhs5gmmusznpunyfik3rqoqfi73abpcpnbi.ipfs.w3s.link/" + tokenId + ".jpg"} alt="Mingle" width={60} height={60} />
            )}
            <p className="mt-5 mx-10 text-black text-sm font-[family-name:var(--font-PRESSURA)]">The heart of tequila production hums, but something feels off.</p>
            <div className="mt-5 mb-10 flex items-center justify-center">
              <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={c1} >A. Machinery hums faintly, urging you onward.</button>
              <button className={cls(styles.backColor, "text-sm p-2 mx-5 w-32 p-1 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none")} onClick={c2} >B. A quieter path branches off into the dark.</button>
            </div>
          </>
        )
      }
    </>
  )
}
