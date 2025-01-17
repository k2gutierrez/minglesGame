'use client'
import Image from "next/image";
import styles from "./profile.module.css";
import cls from "classnames";
import React from 'react';
import oneOnOne from "../../../public/assets/1of1s.png";

export default function Board() {
    return (
        <>
            <div className="text-center bg-black rounded-xl p-2 mt-10">
                <p className="text-white font-[family-name:var(--font-pressura)]">Players: 1</p>
                <p className="text-white text-sm font-[family-name:var(--font-pressura)]">Deceased: 1</p>
            </div>
            <div className="text-center grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 mt-5">
                <div className="rounded-lg border border-gray-400 font-[family-name:var(--font-hogfish)]">
                    <Image src={oneOnOne} alt="" width={200} height={200} />
                    <p className="mt-1">Mingle ID</p>
                </div>
                <div className="rounded-lg border border-gray-400 font-[family-name:var(--font-hogfish)]">
                    <Image src={oneOnOne} alt="" width={200} height={200} />
                    <p className="mt-1">Mingle ID</p>
                </div>
                <div className="rounded-lg border border-gray-400 font-[family-name:var(--font-hogfish)]">
                    <Image src={oneOnOne} alt="" width={200} height={200} />
                    <p className="mt-1">Mingle ID</p>
                </div>
                <div className="rounded-lg border border-gray-400 font-[family-name:var(--font-hogfish)]">
                    <Image src={oneOnOne} alt="" width={200} height={200} />
                    <p className="mt-1">Mingle ID</p>
                </div>
                <div className="rounded-lg border border-gray-400 font-[family-name:var(--font-hogfish)]">
                    <Image src={oneOnOne} alt="" width={200} height={200} />
                    <p className="mt-1">Mingle ID</p>
                </div>
                <div className="rounded-lg border border-gray-400 font-[family-name:var(--font-hogfish)]">
                    <Image src={oneOnOne} alt="" width={200} height={200} />
                    <p className="mt-1">Mingle ID</p>
                </div>
            </div>
        </>
    )
}
