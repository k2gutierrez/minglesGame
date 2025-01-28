'use client'
import React, { useState, useEffect, useContext } from 'react'
import styles from "./profile.module.css";
import cls from "classnames";
import Link from 'next/link';
import { WalletContext } from '../context/wallet';
import { gameABI } from '../abis/gameABI';
import { ethers } from 'ethers';

export default function NoMingle() {

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
    mingle
  } = useContext(WalletContext);

  const [token, setToken] = useState(null)
  const [loc, setLoc] = useState("")
  const [id, setId] = useState(0)
  const [mstatus, setMstatus] = useState(null)
  const [lvl, setLvl] = useState(0)
  const [cstage, setCstage] = useState(0)
  const [crevive, setCrevive] = useState(null)

  {/*useEffect(() => {
    console.log(token)
  }, [token])*/}

  const GetUser = async () => {
    if (token == null) return
    try {
      const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT_SEPOLIA, gameABI, provider)
      const getUser = await gameContract.getUser(token)
      
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
      <div className='rounded-2xl p-3 bg-black text-white text-center mt-10'>
        <p className="text-md font-[family-name:var(--font-pressura)]">You have no Mingles, you bum.</p>
        <p className="text-md font-[family-name:var(--font-pressura)]">Go buy some.</p>
      </div>
      <div className="flex items-center justify-center">
        <Link href={"https://magiceden.io/collections/apechain/0x6579cfd742d8982a7cdc4c00102d3087f6c6dd8e"} target='_blank' className={cls(styles.backColor, "text-center my-10 text-base w-32 p-1 rounded-xl")} >buy</Link>
      </div>
      <div className='rounded-2xl p-3 bg-black text-white text-center mx-10'>
        <p className="text-md font-[family-name:var(--font-pressura)]">Check if your mingle can RAID or not</p>

      </div>
      <p className='mt-10 font-[family-name:var(--font-hogfish)]'>Enter Mingle ID#</p>
      <div className="text-center space-y-2 mb-6">
        <input placeholder="4545" className={"text-black text-center text-base border border-red-500  rounded-md font-[family-name:var(--font-pressura)]"} onChange={e => setToken(e.target.value)}></input>
        <button
          className="ms-2 center rounded-lg bg-red-500 p-1 font-[family-name:var(--font-pressura)] text-sm font-bold  text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          onClick={GetUser}
        >check
        </button>
      </div>
      {mstatus && (
        <p className='mt-5 font-[family-name:var(--font-pressura)]'>Mingle is <span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>Registered</span></p>
      ) 
      }
      {id == 0 && (
        <p className='mt-5 font-[family-name:var(--font-pressura)]'>Mingle is <span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>Not Registered</span></p>
      ) 
      }
      {id != 0 && mstatus == false ? (
        <p className='mt-5 font-[family-name:var(--font-pressura)]'>Mingle is <span className='text-red-600 font-[family-name:var(--font-hogfish)]'>Dead</span></p>
      ) : (
        <></>
      )
      }
         
    </>
  )
}
