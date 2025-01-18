import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { WalletContext } from '../context/wallet'
import { ethers } from 'ethers';
import { gameABI } from '../abis/gameABI';
import { GetMingleMetadata } from '../engine/engine';
import { mingleType } from '../engine/engine';
import { Sign } from '../engine/engine';
import Image from 'next/image';

export default function Card({ nft }) {

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

    const [loc, setLoc] = useState("")
    const [id, setId] = useState(0)
    const [mstatus, setMstatus] = useState()
    const [lvl, setLvl] = useState(0)
    const [cstage, setCstage] = useState(0)
    const [crevive, setCrevive] = useState()
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        GetUser(nft)
        if (trigger == true){
            triggerRegister
        }
    }, [nft, trigger])

    const registerInContext = async () => {
        setTokenId(nft)
        setLocation(loc)
    }

    const triggerRegister = async () => {
        setTokenId(nft)
        await GetUser(nft)
        setLocation(loc)
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

    const getMingleData = async () => {

        let type = await GetMingleMetadata(nft, provider)
        let surviveChance = await mingleType(type)
        try {
            let sign = await Sign(nft, surviveChance, signer)
            let w = await sign.wait()
            setLocation("patio")
            
            
        } catch (e) {
            console.error(e)
            window.alert(e)
        }
    }

    return (
        <div key={id} className="rounded-lg border border-gray-400 font-[family-name:var(--font-hogfish)]">
            <Image src={"https://d9emswcmuvawb.cloudfront.net/PFP" + nft + ".png"} alt={id} width={200} height={200} />
            {id == 0 ?
                (
                    <>
                        <p className="pt-1"># {nft + " "}
                            <span className={"text-green-500"}  >
                                {"Not registered"}
                            </span>
                        </p>
                        <button type="button" onClick={getMingleData} className="border border-1 border-black px-1 pt-2 rounded-xl mb-1 bg-slate-300">
                            {"Register"}
                        </button>
                    </>
                ) : (
                    <>
                        <p className="pt-1"># {nft + " "}
                            <span className={mstatus ? "text-green-500" : "text-red-500"}  >
                                {mstatus ? "Alive" : "Dead"}
                            </span>
                        </p>
                        {mstatus && (
                            <button type="button" onClick={registerInContext} className="border border-1 border-black px-1 pt-2 rounded-xl mb-1 bg-slate-300">
                                {"Continue"}
                            </button>
                        )
                        }
                    </>
                )
            }
        </div>
    )
}
