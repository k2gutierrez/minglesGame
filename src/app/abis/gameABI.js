export const gameABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftPlayerAddress_1",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "nftPlayerAddress_2",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "NftGame__AlreadyASurvivor",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__GameHasNotStarted",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__GameHasStarted",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__GameIsPaused",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__GameMustBePaused",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__IncorrectAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__MingleCannotRevive",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__MingleNotOwned",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NextRoundNotAvailable",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NftIdRegistered",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NftIsDead",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NftNotOwned",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NftPrizeSet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NoBalanceInContract",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NoExternalContractInteractionAllowed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NoNFTsPlayersAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NoNftPrizeSet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NoSurvivors",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NoUsersRegistered",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NotASurvivor",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__NotOwner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__WrongChoiceInput",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NftGame__WrongCollection",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "BalanceWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "FailedAdventure",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "usersInRound",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timeStamp",
                "type": "uint256"
            }
        ],
        "name": "GameEnded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "startingTime",
                "type": "uint256"
            }
        ],
        "name": "GameStarted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "MayahuelRevivedYou",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            }
        ],
        "name": "NFTPrizeSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "nftPlayerAddress_1",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "nftPlayerAddress_2",
                "type": "address"
            }
        ],
        "name": "NFTsSetForPlay",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "name": "Survivors",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "winner",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "collection",
                "type": "bytes32"
            }
        ],
        "name": "WinnerSelected",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [],
        "name": "ActiveAdventureFailed",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MINIMUM_USD",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftPrizeAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_nftPrizeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_gameCost",
                "type": "uint256"
            }
        ],
        "name": "StartGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ToggleNextRound",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nft",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_location",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_collection",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_choice",
                "type": "uint256"
            }
        ],
        "name": "choice",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nft",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_location",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_collection",
                "type": "bytes32"
            }
        ],
        "name": "escapeChoice",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fund",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAmountOfRegisteredUsers",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDeadNftsLength",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getGamePausedStatus",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getGameStatus",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMinglesForRaffle",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "nftId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum NftGame.GameState",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "location",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wormLvl",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stage",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "revive",
                        "type": "bool"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "collection",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct NftGame.User[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMinglesForRaffleLength",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getNftsForFinalBattleLength",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPlayingNFTsAddresses",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPrizeInfo",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRegisteredUsersCollection",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "nftId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum NftGame.GameState",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "location",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wormLvl",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stage",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "revive",
                        "type": "bool"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "collection",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct NftGame.User[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nft",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_collection",
                "type": "bytes32"
            }
        ],
        "name": "getUser",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "nftId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum NftGame.GameState",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "location",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wormLvl",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stage",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "revive",
                        "type": "bool"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "collection",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct NftGame.User",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nft",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_wormLvl",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_location",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_collection",
                "type": "bytes32"
            }
        ],
        "name": "nextRound",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pauseGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_nft",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_wormLvl",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_location",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_collection",
                "type": "bytes32"
            }
        ],
        "name": "register",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "resetGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "selectWinner",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawBalance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]