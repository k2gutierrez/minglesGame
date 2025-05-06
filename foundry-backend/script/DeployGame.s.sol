// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {NFT} from "../src/nft.sol";
import {DeployMingles} from "./DeployBasicNFT.s.sol";
import {DeployGS} from "./DeployBasicNFT.s.sol";
import {NftGame} from "../src/NftGame.sol";

contract DeployBasicNFT is Script {

    function run() external returns(NftGame){
        vm.startBroadcast();
        DeployMingles basicNFT = new DeployMingles();
        DeployGS basicNFT2 = new DeployGS();
        NftGame game = new NftGame(address(basicNFT), address(basicNFT2));
        vm.stopBroadcast();

        return game;
    }
}