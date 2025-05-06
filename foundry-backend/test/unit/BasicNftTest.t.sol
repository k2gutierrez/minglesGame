// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {NFT} from "../../src/nft.sol";

contract BasicNftTest is Test {

    string constant NAME = "Mingles";
    string constant SYMBOL = "Mgls";
    string constant URI = "ipfs://QmcoeRsFYeHzPD9Gx84aKD3tjLUKjvPEMSmoPs2GQmHR1t/";

    NFT basicNft;

    address USER = makeAddr("user");

    function setUp() public {
        basicNft = new NFT(NAME, SYMBOL, URI);
    }

    function testViewTokenUri() public {
        vm.prank(USER);
        basicNft.mintTo(USER);
        console2.log(basicNft.tokenURI(1));
    }
}