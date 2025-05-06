// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console2} from "forge-std/Script.sol";
import {NFT} from "../src/nft.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
import {NftGame} from "../src/NftGame.sol";

contract MintBasicNFT is Script {

    address private constant MAIN = 0xca067E20db2cDEF80D1c7130e5B71C42c0305529;
    
    function run() external {
        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment("NFT", block.chainid);
        mintNftOnContract(mostRecentlyDeployed);
    }

    function mintNftOnContract(address contractAddress) public {
        vm.startBroadcast();
        NFT(contractAddress).mintTo(MAIN);
        vm.stopBroadcast();
    }

}

contract startGame is Script {
    
    function run() external {
        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment("NftGame", block.chainid);
        startTheGame(mostRecentlyDeployed);
    }

    function startTheGame(address contractAddress) public {
        (address adr, ) = NftGame(payable(contractAddress)).getPlayingNFTsAddresses();
        vm.startBroadcast();
        NFT(adr).approve(contractAddress, 1);
        NFT(adr).mintTo(msg.sender);
        NftGame(payable(contractAddress)).StartGame(adr, 1, 0);
        vm.stopBroadcast();
    }

}