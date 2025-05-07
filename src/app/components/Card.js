import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { WalletContext } from '../context/wallet'
import { ethers } from 'ethers';
import { gameABI } from '../abis/gameABI';
import { GetMingleMetadata } from '../engine/engine';
import { mingleType } from '../engine/engine';
import { Sign } from '../engine/engine';
import Image from 'next/image';
import Loader from './Loader';

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
        setTokenId,
        collection,
        setCollection
    } = useContext(WalletContext);

    const [loc, setLoc] = useState("")
    const [id, setId] = useState(0)
    const [mstatus, setMstatus] = useState()
    const [lvl, setLvl] = useState(0)
    const [cstage, setCstage] = useState(0)
    const [crevive, setCrevive] = useState()
    const [trigger, setTrigger] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        GetUser(nft.token, nft.collection)
        
        if (trigger == true){
            triggerRegister
        }
    }, [nft, trigger])

    const registerInContext = async () => {
        setTokenId(nft.token)
        setCollection(nft.collection)
        setTimeout(() => {
            setLocation(loc)
        }, 1000);
    }

    const triggerRegister = async () => {
        setTokenId(nft.token)
        setCollection(nft.collection)
        await GetUser(nft.token, nft.collection)
        setLocation(loc)
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
            let  col = getUser[6]
            setCollection(col);

        } catch (e) {
            console.error(e)
        }
    }

    const getMingleData = async () => {
        setLoading(true)
        let type = await GetMingleMetadata(nft.token, provider)
        //let surviveChance = await mingleType(type)
        try {
            let sign = await Sign(nft.token, nft.collection, signer)
            setTokenId(nft.token)
            setCollection(nft.collection)
            let w = await sign.wait()
            setLocation("patio")
            
            
        } catch (e) {
            console.error(e)
            window.alert(e)
        }
    }

    return (
        <div key={id} className="rounded-xl border border-gray-400 font-[family-name:var(--font-hogfish)]">
            {nft.collection == "collection1" && (
                <>
                    <Image className='rounded-lg' src={"https://d9emswcmuvawb.cloudfront.net/PFP" + nft.token + ".png"} alt={id} width={200} height={200} />
                </>
            )
            }
            {nft.collection == "collection2" && 
                (
                    <>
                        <Image className='rounded-lg' src={"https://bafybeifrjmhpuf34cv6sy4lqhs5gmmusznpunyfik3rqoqfi73abpcpnbi.ipfs.dweb.link/" + nft.token + ".jpg"} alt={id} width={200} height={200} />
                    </>
                )
            }
            
            {id == 0 ?
                (
                    <>
                        <p className="pt-1"># {nft + " "}
                            <span className={"text-green-500"}  >
                                {"Not registered"}
                            </span>
                        </p>
                        {loading == true ?
                        (
                            <Loader />
                        )
                        : (<button type="button" onClick={getMingleData} className="border border-1 border-black px-1 pt-2 rounded-xl mb-1 bg-slate-300">
                            {"Register"}
                        </button>)}
                    </>
                ) : (
                    <>
                        <p className="pt-1"># {nft + " "}
                            <span className={mstatus == true ? "text-green-500" : "text-red-500"}  >
                                {mstatus == true ? "Alive" : "Dead"}
                            </span>
                        </p>
                        {mstatus == true && (
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
