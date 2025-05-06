// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {NFT} from "../../src/nft.sol";
import {DeployMingles} from "../../script/DeployBasicNFT.s.sol";

contract MoodNftIntegrationTest is Test {
    NFT basicNft;

    DeployMingles deployer;

    address USER = makeAddr("user");

    function setUp() public {
        deployer = new DeployMingles();
        basicNft = deployer.run();
    }

    function testGetBasicUri() public view {
        
        string memory basicUri = basicNft.baseURI();
        assertEq(basicUri, "ipfs://QmcoeRsFYeHzPD9Gx84aKD3tjLUKjvPEMSmoPs2GQmHR1t/");
    }

    function testGetCounter() public {
        vm.prank(USER);
        basicNft.mintTo(USER);
        uint256 counter = basicNft.currentTokenId();
        assert(counter == 1);
    }
    
}