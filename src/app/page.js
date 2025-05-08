'use client'
import Image from "next/image";
import styles from "./profile.module.css";
//import { saveAs } from "file-saver";
//import mergeImages from "merge-images";
//import { ScratchCard } from "next-scratchcard";
import { React, useContext, useEffect, useState } from 'react';
import { WalletContext } from "./context/wallet.js";
import { ethers } from "ethers";
import { gameABI } from "./abis/gameABI";
//import { TwitterShareButton } from "react-twitter-embed";
import Link from "next/link";
import cls from "classnames";
import logo from "../../public/assets/MinglesLogo_Black 2.png";
import Login from "./components/Login";
import NotLogged from "./components/NotLogged";
import SelectMingle from "./components/SelectMingle";
import NoMingle from "./components/NoMingle";
import Won from "./components/Won";
import Die from "./components/Die";
import Patio from "./components/zones/Patio";
import Rules from "./components/Rules";
import Pop from "./components/Pop";
import Board from "./components/Board";
import RavenNest from "./components/zones/RavenNest";
import axios from 'axios';
import { BrowserProvider } from "ethers";
import No from "./components/No";
import MainHall from "./components/zones/MainHall";
import BackDoorTunnels from "./components/zones/BackDoorTunnels";
import OvenRoom from "./components/zones/OvenRoom";
import DistilleryRoom from "./components/zones/DistilleryRoom";
import BarrelRoom from "./components/zones/BarrelRoom";
import Hall1 from "./components/zones/Hall1";
import Hall2 from "./components/zones/Hall2";
import Hall3 from "./components/zones/Hall3";
import FermentationRoom from "./components/zones/FermentationRoom";
import PrivateCava from "./components/zones/PrivateCava";
import BasementPrison from "./components/zones/BasementPrison";
import Survivor from "./components/zones/Survivor";
import MingleCheck from "./components/MingleCheck";

export default function Home() {

  //let metadataTest = 'https://ipfs.io/ipfs/QmcoeRsFYeHzPD9Gx84aKD3tjLUKjvPEMSmoPs2GQmHR1t/1'
  //let imageTest = 'https://ipfs.io/ipfs/QmY3DR3EKhLsZx1Dx1vM8HRc2xXvwjCJ6shdHV6pavc7eL/1.png'

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
    contract,
    setContract
  } = useContext(WalletContext);

  let [mingle, setMingle] = useState(null);
  let [gsApe, setGsApe] = useState(null);
  let [chain, setChain] = useState(0)

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("Wallet is not installed!");
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      setProvider(provider)
      const accounts = await provider.send("eth_requestAccounts", []);
      setUserAddress(accounts[0]);
      const signer = await provider.getSigner();
      setSigner(signer);
      const network = await provider.getNetwork();
      const chainID = network.chainId;
      setChain(chainID.toString())
      const sepoliaNetworkId = "11155111"
      const apeChainId = "33139"
      const _contract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, provider)
      setContract(_contract)

      setIsConnected(true);

      if (chainID.toString() !== apeChainId) {
        alert("Please switch your metamask to apechain network")
        return
      }

      {/*if (chainID.toString() !== sepoliaNetworkId) {
        alert("Please switch your wallet to sepolia network")
        return
      }*/}

    } catch (error) {
      console.error("connection error: ", error);
    }

  }

  async function getMingles() {
    const mingles_curtis = `https://api-curtis.reservoir.tools/users/${userAddress}/tokens/v10?contract=0x9AD70bAE14e13BD39E92b88fd767a9F9370Dc63f&sortDirection=asc&limit=200`
    const mingles_ape = `https://api-apechain.reservoir.tools/users/${userAddress}/tokens/v10?contract=0x6579cfD742D8982A7cDc4C00102D3087F6c6dd8E&sortDirection=asc&limit=200`
    //api-apechain
    const options = {
      method: 'GET',
      url: mingles_curtis,
      headers: { accept: '*/*', 'x-api-key': process.env.NEXT_PUBLIC_RESERVOIR }
    };

    axios
      .request(options)
      .then(res => {
        let data1 = res.data
        setMingle(data1)
        setTimeout(() => {
          setLocation("mingles")
        }, 1500);
      })
      .catch(err => console.error(err));
  }

  async function getGsApe() {

    const gsape_curtis = `https://api-curtis.reservoir.tools/users/${userAddress}/tokens/v10?contract=0x68206E2D0B5c0aD16E2dd05Ce7eC0ea2f571DDFf&sortDirection=asc&limit=200`
    const gsape_ape = `https://api-apechain.reservoir.tools/users/${userAddress}/tokens/v10?contract=0xb3443b6bd585ba4118cae2bedb61c7ec4a8281df&sortDirection=asc&limit=200`
    const options = {
      method: 'GET',
      url: gsape_curtis,
      headers: { accept: '*/*', 'x-api-key': process.env.NEXT_PUBLIC_RESERVOIR }
    };

    axios
      .request(options)
      .then(res => {
        let data1 = res.data
        setGsApe(data1)
        setTimeout(() => {
          setLocation("mingles")
        }, 1500);
        
      })
      .catch(err => console.error(err));
  }

  async function getCollections() {
    await getMingles();
    await getGsApe();
  }

  return (
    <div className="grid justify-items-center text-black font-[family-name:var(--font-pressura)]">
      <div className={cls(styles.backColor, "min-w-full px-1 flex items-center justify-center text-black text-sm")}>
        <p className="me-10 p-1">Mingles Prison Break [on chain]</p>
        <button className="p-1" onClick={() => setLocation("")}><Image src={logo} alt="Mingles Logo" width={60} height={60} /></button>
      </div>
      {location == "" && (
        <>
          <Login connect={connectWallet} getMingles={getCollections} />
          {isConnected && (
            <MingleCheck />
          )
          }

        </>
      )
      }
      {location == "mingles" && (
        <SelectMingle mingle={mingle} gsOnApe={gsApe} />
      )
      }
      {location == "no" && (
        <No />
      )
      }
      {location == "patio" && (
        <Patio />
      )
      }
      {location == "main hall" && (
        <MainHall />
      )
      }
      {location == "back door tunnels" && (
        <BackDoorTunnels />
      )
      }
      {location == "oven room" && (
        <OvenRoom />
      )
      }
      {location == "distillery room" && (
        <DistilleryRoom />
      )
      }
      {location == "barrel room" && (
        <BarrelRoom />
      )
      }
      {location == "hall1" && (
        <Hall1 />
      )
      }
      {location == "hall2" && (
        <Hall2 />
      )
      }
      {location == "hall3" && (
        <Hall3 />
      )
      }
      {location == "fermentation room" && (
        <FermentationRoom />
      )
      }
      {location == "private cava" && (
        <PrivateCava />
      )
      }
      {location == "raven nest" && (
        <RavenNest />
      )
      }
      {location == "basement prison" && (
        <BasementPrison />
      )
      }
      {location == "survivors" && (
        <Survivor />
      )
      }
      {location == "dead" && (
        <Die />
      )
      }
      {location == "board" && (
        <Board />
      )
      }
      {location == "rules" && (
        <Rules getMingles={getMingles} />
      )
      }
      {location == "noMingle" && (
        <NoMingle />
      )
      }
    </div>
  );
}
