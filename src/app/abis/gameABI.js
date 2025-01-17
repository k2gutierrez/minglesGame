export const gameABI = [
	{
		"inputs": [],
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
		"name": "NftGame__NotOwner",
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
		"inputs": [],
		"name": "GameEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
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
				"name": "nftAddressPlayer",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_nftId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_nftAddressPlayer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_gameCost",
				"type": "uint256"
			}
		],
		"name": "gameStarted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllRegisteredUsers",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
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
		"name": "getCaidos",
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
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
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
		"name": "getNextRoundAvailable",
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
		"name": "getNftsOfFallenMingles",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
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
		"name": "getPlayingNFTsAddress",
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
		"name": "getSurvivors",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSurvivorsLength",
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
				"internalType": "uint256",
				"name": "_nft",
				"type": "uint256"
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
						"internalType": "bool",
						"name": "status",
						"type": "bool"
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
				"internalType": "uint256",
				"name": "_gameCost",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_location",
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
				"internalType": "uint256",
				"name": "_gameCost",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_location",
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