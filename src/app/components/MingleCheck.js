'use client'
import React, { useState, useEffect, useContext } from 'react'
import styles from "./profile.module.css";
import cls from "classnames";
import Link from 'next/link';
import { WalletContext } from '../context/wallet';
import { gameABI } from '../abis/gameABI';
import { ethers } from 'ethers';
import { toBytes } from 'viem';

export default function MingleCheck() {

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
    setMingle,
    mingle,
    collection,
    setCollection
  } = useContext(WalletContext);

  const [token, setToken] = useState("")
  const [check, setCheck] = useState(false)
  const [id, setId] = useState(0)
  const [mstatus, setMstatus] = useState(null)


  {/*useEffect(() => {
    console.log(token)
  }, [token])*/}

  const GetUser = async () => {
    if (token == null) return
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, provider)
      const getUser = await gameContract.getUser(token, toBytes("collection1", { size: 32 }))

      let id = ethers.toNumber(getUser[0])
      setId(id)
      let mStatus = getUser[1]
      setMstatus(mStatus)
      setCheck(true)

    } catch (e) {
      console.error(e)
    }
  }

  const GetUser2 = async () => {
    if (token == null) return
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, provider)
      const getUser = await gameContract.getUser(token, toBytes("collection1", { size: 32 }))

      let id = ethers.toNumber(getUser[0])
      setId(id)
      let mStatus = getUser[1]
      setMstatus(mStatus)
      setCheck(true)

    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>

      <div className="flex items-center justify-center space-x-5">
        <Link href={"https://magiceden.io/collections/apechain/0xb3443b6bd585ba4118cae2bedb61c7ec4a8281df"} target='_blank' className={cls(styles.backColor, "text-center my-10 text-base w-32 p-1 rounded-xl")} >Buy GS on Ape</Link>
        <Link href={"https://magiceden.io/collections/apechain/0x6579cfd742d8982a7cdc4c00102d3087f6c6dd8e"} target='_blank' className={cls(styles.backColor, "text-center my-10 text-base w-32 p-1 rounded-xl")} >Buy Mingle</Link>
      </div>

      <div className='rounded-2xl p-3 bg-black text-white text-center mx-10'>
        <p className="text-md font-[family-name:var(--font-pressura)]">Check if your NFT can RAID or not</p>
      </div>
      <p className='mt-10 font-[family-name:var(--font-hogfish)]'>Enter ID#</p>
      <div className="text-center space-y-3 mb-6 space-x-10 items-center justify-center mb-10">
        <input placeholder="4545" className={"text-black text-center text-base border border-red-500 rounded-md font-[family-name:var(--font-pressura)]"} onChange={e => setToken(e.target.value)}></input>
        <button
          className="ms-2 center rounded-lg bg-red-500 p-1 font-[family-name:var(--font-pressura)] text-sm font-bold  text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          onClick={GetUser}
        >check Gs on Ape
        </button>
        <button
          className="ms-2 center rounded-lg bg-red-500 p-1 font-[family-name:var(--font-pressura)] text-sm font-bold  text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          onClick={GetUser2}
        >check Mingles
        </button>
        {mstatus != 4 && check && token != "" && (
          <p className='my-8 font-[family-name:var(--font-pressura)]'>NFT is <span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>Registered</span></p>
        )
        }
        {id == 0 && check && token != "" && (
          <p className='my-8 font-[family-name:var(--font-pressura)]'>NFT is <span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>Not Registered</span></p>
        )
        }
        {id != 0 && mstatus == 4 && token != "" && (
          <p className='my-8 font-[family-name:var(--font-pressura)]'>NFT is <span className='text-red-600 font-[family-name:var(--font-hogfish)]'>Dead</span></p>
        ) 
        }
      </div>


    </>
  )
}
