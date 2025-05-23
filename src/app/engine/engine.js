import { ethers } from "ethers";
import { mingleABI } from "../abis/mingleABI";
import { gameABI } from "../abis/gameABI";
import { toBytes } from "viem";

const externalProvider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_NODE)

export async function Sign(_nft, _collection, signer) {
    if (_nft == null) return
    const resurrection = 15;
    const startingLcation = "patio"
    try {
        const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, signer)
        const signIn = await gameContract.register(_nft, resurrection, toBytes(startingLcation, {size:32}), toBytes(_collection, {size:32}) , {
            value: ethers.parseEther("0"),
            gasLimit: 3000000, // or a dynamic estimate
            //gasPrice: ethers.parseUnits("10", "gwei")
        })
        console.log(_nft)
        console.log(resurrection)
        console.log(startingLcation)
        console.log(_collection)
        
        return signIn
    } catch (e) {
        console.error(e)
    }
}

export async function Choice(_nft, _location, _collection, _num, signer) {
    if (_nft == null) return
    try {
        const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, signer)
        const choiceToSurvive = await gameContract.choice(_nft, toBytes(_location, {size:32}), toBytes(_collection, {size:32}), _num, {
                gasLimit: 3000000, // or a dynamic estimate
                //gasPrice: ethers.parseUnits("10", "gwei")
            })
        return choiceToSurvive
    } catch (e) {
        console.error(e)
    }
}

export async function EscapeChoice(_nft, _location, _collection, signer) {
    if (_nft == null) return
    try {
        const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, signer)
        const choiceToEscape = await gameContract.escapeChoice(_nft, toBytes(_location, {size:32}), toBytes(_collection, {size:32}), {
                gasLimit: 3000000, // or a dynamic estimate
                //gasPrice: ethers.parseUnits("10", "gwei")
            })
        return choiceToEscape
    } catch (e) {
        console.error(e)
    }
}

export async function GetUser(_nft, _collection, provider) {
    if (_nft == null) return
    try {
        const gameContract = new ethers.Contract(process.env.NEXT_PUBLIC_GAME_CONTRACT, gameABI, provider)
        const getUser = await gameContract.getUser(_nft, toBytes(_collection, {size:32}))
        let loc = ethers.decodeBytes32String(getUser[2])
        let id = ethers.toNumber(getUser[0]).toString()
        let mStatus = getUser[1]
        let lvl = ethers.toNumber(getUser[3]).toString()
        let Cstage = ethers.toNumber(getUser[4]).toString()
        let Crevive = getUser[5]
        let info = {
            nftId: id,
            status: mStatus,
            location: loc,
            wormLvl: lvl,
            stage: Cstage,
            revive: Crevive,
            collection: _collection
        }
        return info
    } catch (e) {
        console.error(e)
    }
}

export async function GetMingleMetadata(id, provider) {
    const mingleContract = new ethers.Contract(process.env.NEXT_PUBLIC_MINGLE_CONTRACT_CURTIS, mingleABI, provider)
    if (id == null || id == "") return
    try {
        const metadataMingles = await mingleContract.tokenURI(id)

        let url = 'https://ipfs.io/ipfs/' + metadataMingles.split("/")[2] + "/" + id
        let meta = await fetch(url)
        let dataJson  = await meta.json()
        let d = await dataJson.attributes[4].value
        return d
    } catch (e) {
        console.error(e)
    }
}

export const mingleType = (type) => {

    const lvl1 = ["Classic White", "Classic Red", "Prehispanic Red", "Prehispanic White", "Jimador"]
    const lvl2 = ["Pink Axolotl", "Blue Axolotl", "Water", "Ape", "Agave", "Slime", "Jaguar", "Robot Gen 2", "AI-worm", "Xoloescuincle", "Zombie"]
    const lvl3 = ["Mariachi", "Spirit", "Alebrije", "Catrín", "Shroom", "Peyote", "Space Suit"]
    const lvl4 = ["Rock-Wind", "Ice", "Tequila", "Water-Lightning", "Lava", "Gold"]

    let num = 0;
    if (lvl1.includes(type)) {num = 5;};

    if (lvl2.includes(type)) {num = 10;};

    if (lvl3.includes(type)) {num = 15;};

    if (lvl4.includes(type)) {num = 20;};

    if (type == "1 of 1") {num = 25;};

    return num

}