// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {NFT} from "../../src/nft.sol";
import {DeployMingles} from "../../script/DeployBasicNFT.s.sol";

contract BasicNftTest is Test {
    DeployMingles public deployer;
    NFT public basicNFT;
    
    address public USER = makeAddr("user");

    function setUp() public {
        deployer = new DeployMingles();
        basicNFT = deployer.run();
    }

    function testCanMintAndHaveABalance() public {
        vm.prank(USER);
        basicNFT.mintTo(USER);

        assert(basicNFT.balanceOf(USER) == 1);

    }
}