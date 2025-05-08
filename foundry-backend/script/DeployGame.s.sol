// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {NFT} from "../src/nft.sol";
import {DeployMingles} from "./DeployBasicNFT.s.sol";
import {DeployGS} from "./DeployBasicNFT.s.sol";
import {NftGame} from "../src/NftGame.sol";

contract DeployGame is Script {

    function run() external returns(NftGame){
        vm.startBroadcast();
        DeployMingles basicNFT = new DeployMingles();
        DeployGS basicNFT2 = new DeployGS();
        NftGame game = new NftGame(address(basicNFT), address(basicNFT2));
        vm.stopBroadcast();

        return game;
    }
}

contract DeployGameWithContracts is Script {

    address public constant address1 = 0x9AD70bAE14e13BD39E92b88fd767a9F9370Dc63f; 
    address public constant address2 = 0x68206E2D0B5c0aD16E2dd05Ce7eC0ea2f571DDFf;

    function run() external returns(NftGame){
        vm.startBroadcast();
        NftGame game = new NftGame(address1, address2);
        vm.stopBroadcast();

        return game;
    }
}