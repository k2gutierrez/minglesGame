'use client'
import React from 'react'
import styles from "./profile.module.css";
import cls from "classnames";
import Link from 'next/link';

export default function NoMingle() {
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
        <p className="text-md font-[family-name:var(--font-pressura)]">Check if your mingle is still alive or if it died in the raid</p>
    
      </div>
      <p className='mt-10 font-[family-name:var(--font-hogfish)]'>Enter Mingle ID#</p>
      <div className="text-center space-y-2 mb-6">
          <input placeholder="Mingle ID" className={"text-black text-center text-base border border-red-500  rounded-md font-[family-name:var(--font-pressura)]"} onChange={e => setId(e.target.value)}></input>
          <button
            className="ms-2 center rounded-lg bg-red-500 p-1 font-[family-name:var(--font-pressura)] text-sm font-bold  text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >check
          </button>
        </div>
        <p className='mt-5 font-[family-name:var(--font-pressura)]'>Mingle is <span className='text-blue-600 font-[family-name:var(--font-hogfish)]'>Alive</span></p>
        <p className='mt-5 font-[family-name:var(--font-pressura)]'>Mingle is <span className='text-red-600 font-[family-name:var(--font-hogfish)]'>Dead</span></p>
    </>
  )
}
