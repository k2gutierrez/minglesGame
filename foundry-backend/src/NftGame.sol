// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title NFT Gamefied expierence to enter a raffle
 * @author Carlos Enrique Gutiérrez Chimal
 * @author Github - k2gutierre
 * @author X - CarlosDappsDev.eth
 * @author 0xc6D11bF969C4E34e923ec476FE76f7D7ad0Ce685
 */
contract NftGame {

    ////////////////////// Custom Errors //////////////////////

    error NftGame__NotOwner();
    error NftGame__GameHasStarted();
    error NftGame__GameHasNotStarted();
    error NftGame__NoNftPrizeSet();
    error NftGame__NftPrizeSet();
    error NftGame__NftNotOwned();
    error NftGame__NftIdRegistered();
    error NftGame__NftIsDead();
    error NftGame__NoSurvivors();
    error NftGame__NoUsersRegistered();
    error NftGame__NoNFTsPlayersAddress();
    error NftGame__MingleNotOwned();
    error NftGame__GameIsPaused();
    error NftGame__AlreadyASurvivor();
    error NftGame__MingleCannotRevive();
    error NftGame__IncorrectAmount();
    error NftGame__NextRoundNotAvailable();
    error NftGame__GameMustBePaused();
    error NftGame__NoBalanceInContract();
    error NftGame__NoExternalContractInteractionAllowed();
    error NftGame__WrongCollection();
    error NftGame__WrongChoiceInput();
    error NftGame__NotASurvivor();

    ////////////////////// Game Enum: Game State //////////////////////

    enum GameState {
        NOT_REGISTERED,
        PLAYING,
        FINAL_BATTLE,
        IN_RAFFLE,
        DEAD,
        WAITING_NEXT_ROUND
    }

    ////////////////////// Game Struct: User //////////////////////

    struct User {
        uint256 nftId;
        GameState status;
        bytes32 location;
        uint256 wormLvl;
        uint256 stage;
        bool revive;
        bytes32 collection;
    }

    ////////////////////// Variables //////////////////////

    // BYTES32 for collections
    bytes32 private constant COLLECTION1 = 0x636f6c6c656374696f6e31000000000000000000000000000000000000000000;
    bytes32 private constant COLLECTION2 = 0x636f6c6c656374696f6e32000000000000000000000000000000000000000000;

    bytes32 private constant DEAD_LOCATION = 0x6465616400000000000000000000000000000000000000000000000000000000;
    bytes32 private constant PATIO = 0x706174696f000000000000000000000000000000000000000000000000000000;
    bytes32 private constant MAIN_HALL = 0x6d61696e2068616c6c0000000000000000000000000000000000000000000000;
    bytes32 private constant BACK_DOOR_TUNNELS = 0x6261636b20646f6f722074756e6e656c73000000000000000000000000000000;
    bytes32 private constant OVEN_ROOM = 0x6f76656e20726f6f6d0000000000000000000000000000000000000000000000; //
    bytes32 private constant DISTILLERY_ROOM = 0x64697374696c6c65727920726f6f6d0000000000000000000000000000000000;
    bytes32 private constant BARREL_ROOM = 0x62617272656c20726f6f6d000000000000000000000000000000000000000000;
    
    bytes32 private constant HALL1 = 0x68616c6c31000000000000000000000000000000000000000000000000000000;
    bytes32 private constant HALL2 = 0x68616c6c32000000000000000000000000000000000000000000000000000000;
    bytes32 private constant HALL3 = 0x68616c6c33000000000000000000000000000000000000000000000000000000;

    bytes32 private constant FERMENTATION_ROOM = 0x6665726d656e746174696f6e20726f6f6d000000000000000000000000000000;
    bytes32 private constant PRIVATE_CAVA = 0x7072697661746520636176610000000000000000000000000000000000000000;
    
    bytes32 private constant RAVEN_NEST = 0x726176656e206e65737400000000000000000000000000000000000000000000;
    //bytes32 private constant BASEMENT_PRISON = 0x626173656d656e7420707269736f6e0000000000000000000000000000000000;
    //bytes32 private constant SURVIVORS = 0x7375727669766f72730000000000000000000000000000000000000000000000;

    // Owner of contract address
    address private immutable i_owner;

     // Address and id of prize nft
    address private s_nftPrizeAddress;
    uint256 private s_nftPrizeId;

    // Adress of NFTS that are playing - we use the mingles nft
    address private immutable i_nftPlayersAddress_1;
    address private immutable i_nftPlayersAddress_2;

    // bool variables, GAME STATUS AND GAME PAUSED
    bool private s_gameStatus;
    bool private s_gamePaused;
    bool private s_nextRoundAvailable;

    // Cost of registry
    uint256 private s_gameCost;

    // Arrays for final battle, registered and lost players
    User[] private s_registros;
    User[] private s_minglesForRaffle;

    // mapping to user struct
    mapping(bytes32 => mapping(uint256 => User)) private s_users;

    // Receiver variables
    uint256 public constant MINIMUM_USD = 0.1 ether;
    address[] private s_funders;
    mapping(address => uint256) private s_addressToAmountFunded;

    ////////////////////// creation of contract to set the Owner //////////////////////
    constructor(address nftPlayerAddress_1, address nftPlayerAddress_2) {
        i_owner = msg.sender;
        i_nftPlayersAddress_1 = nftPlayerAddress_1;
        i_nftPlayersAddress_2 = nftPlayerAddress_2;
    }

    ////////////////////// Events //////////////////////

    event BalanceWithdrawn(uint256 amount);
    event GameStarted(uint256 startingTime);
    event GameEnded(uint256 usersInRound, uint256 timeStamp);
    event Survivors(uint256[]);
    event WinnerSelected(uint256 winner, bytes32 collection);
    event NFTPrizeSet(address nftAddress, uint256 nftId);
    event NFTsSetForPlay(address nftPlayerAddress_1, address nftPlayerAddress_2);
    event FailedAdventure();
    event MayahuelRevivedYou(uint256);

    ////////////////////// Modifiers //////////////////////
    modifier onlyOwner() {
        if (msg.sender != i_owner) revert NftGame__NotOwner();
        _;
    }

    modifier gameHasStarted() {
        if (s_gameStatus == false) revert NftGame__GameHasNotStarted();
        _;
    }

    modifier notPaused(){
        if (s_gamePaused == true) revert NftGame__GameIsPaused();
        _;
    }

    modifier noContract { // this won't allow external contracts to interact with functions
        if (tx.origin != msg.sender) revert NftGame__NoExternalContractInteractionAllowed();
        _;
    }

    function fund() public payable {
        require(
            msg.value >= MINIMUM_USD,
            "You need to spend more ETH!"
        );
        s_addressToAmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    //////////////////////////////////////////////////////////////////////
    ////////////////////// OnlyOwner Game Functions //////////////////////

    ////////////////////// Start game function
    function StartGame(address _nftPrizeAddress, uint256 _nftPrizeId, uint256 _gameCost) external  onlyOwner noContract {
        if (s_gameStatus == true) revert NftGame__GameHasStarted();
        if (s_nftPrizeAddress != address(0)) revert NftGame__NftPrizeSet();
        if (ERC721(_nftPrizeAddress).ownerOf(_nftPrizeId) != i_owner) revert NftGame__NftNotOwned();

        s_gameCost = _gameCost;
        s_nftPrizeAddress = _nftPrizeAddress;
        s_nftPrizeId = _nftPrizeId;
        ERC721 nft = ERC721(s_nftPrizeAddress);
        //nft.approve(address(this), _nftPrizeId);
        nft.transferFrom(msg.sender, address(this), _nftPrizeId);
        s_gameStatus = true;

        emit GameStarted(block.timestamp);
        emit NFTPrizeSet(s_nftPrizeAddress, s_nftPrizeId);
        emit NFTsSetForPlay(i_nftPlayersAddress_1, i_nftPlayersAddress_2);
    }

    ////////////////////// Activate Pause Game
    function pauseGame() external onlyOwner noContract {
        s_gamePaused = !s_gamePaused;
    }

    ////////////////////// Activate or pause Next round
    function ToggleNextRound() external onlyOwner noContract {
        s_nextRoundAvailable = !s_nextRoundAvailable;
    }

    ////////////////////// Activate Failed Adventure/Mision
    function ActiveAdventureFailed() external onlyOwner noContract {
        if (s_gamePaused == false) revert NftGame__GameMustBePaused();
        
        ERC721 nft = ERC721(s_nftPrizeAddress);
        nft.transferFrom(address(this), i_owner, s_nftPrizeId);

        emit FailedAdventure();
        emit GameEnded(getAmountOfRegisteredUsers(), block.timestamp);

        User[] memory registros = s_registros;

        for (uint256 i; i < registros.length; i++) {
            s_users[registros[i].collection][registros[i].nftId].status = GameState.WAITING_NEXT_ROUND;
            s_users[registros[i].collection][registros[i].nftId].revive = true;
            s_users[registros[i].collection][registros[i].nftId].stage = 0;
            s_users[registros[i].collection][registros[i].nftId].location = "";
        }

        delete s_registros;
        delete s_minglesForRaffle;
        s_gamePaused = false;
        s_nftPrizeAddress = address(0);
        s_nftPrizeId = 0;
        s_gameStatus = false;
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////// Registry and NextGame functions - Users/Gamers //////////////////////

    ////////////////////// New registry
    function register(uint256 _nft, uint256 _wormLvl, bytes32 _location, bytes32 _collection) external payable gameHasStarted notPaused noContract returns (bool) {
        
        if (msg.value < s_gameCost) revert  NftGame__IncorrectAmount();
        
        bytes32 collection;
        User memory user;

        if (_collection == COLLECTION1){
            collection = COLLECTION1;
            user = s_users[collection][_nft];
            if (ERC721(i_nftPlayersAddress_1).ownerOf(_nft) != msg.sender) revert NftGame__NftNotOwned();
            if (user.nftId == _nft && user.collection == COLLECTION1 && user.status == GameState.PLAYING) revert NftGame__NftIdRegistered();
            if (user.nftId == _nft && user.collection == COLLECTION1 && user.status == GameState.DEAD) revert NftGame__NftIsDead();
            user = User(_nft, GameState.PLAYING, _location, _wormLvl, 0, true, collection);
            s_users[COLLECTION1][_nft] = user;
            s_registros.push(user);
            return true;

        } else if (_collection == COLLECTION2) {
            collection = COLLECTION2;
            user = s_users[collection][_nft];
            if (ERC721(i_nftPlayersAddress_2).ownerOf(_nft) != msg.sender) revert NftGame__NftNotOwned();
            if (user.nftId == _nft && user.collection == COLLECTION2 && user.status == GameState.PLAYING) revert NftGame__NftIdRegistered();
            if (user.nftId == _nft && user.collection == COLLECTION2 && user.status == GameState.DEAD) revert NftGame__NftIsDead();
            user = User(_nft, GameState.PLAYING, _location, _wormLvl, 0, true, collection);
            s_users[COLLECTION1][_nft] = user;
            s_registros.push(user);
            return true;
        } else revert NftGame__WrongCollection();

    }
    
    ////////////////////// Check if the registry must be new or give a life to the Mingle to play another game
    function nextRound(uint256 _nft, uint256 _wormLvl, bytes32 _location, bytes32 _collection) external payable gameHasStarted notPaused noContract returns (bool) {
        if (s_nextRoundAvailable == false) revert NftGame__NextRoundNotAvailable();
        
        if (msg.value < s_gameCost) revert  NftGame__IncorrectAmount();
        
        bytes32 collection;
        User memory user = s_users[_collection][_nft];

        if (user.nftId == 0) {
            if (_collection == COLLECTION1){
            collection = COLLECTION1;
            if (ERC721(i_nftPlayersAddress_1).ownerOf(_nft) != msg.sender) revert NftGame__NftNotOwned();
            if (user.nftId == _nft && user.collection == COLLECTION1 && user.status == GameState.PLAYING) revert NftGame__NftIdRegistered();
            if (user.nftId == _nft && user.collection == COLLECTION1 && user.status == GameState.DEAD) revert NftGame__NftIsDead();
            user = User(_nft, GameState.PLAYING, _location, _wormLvl, 0, true, collection);
            s_users[COLLECTION1][_nft] = user;
            s_registros.push(user);
            return true;

            } else if (_collection == COLLECTION2) {
                collection = COLLECTION2;
                user = s_users[collection][_nft];
                if (ERC721(i_nftPlayersAddress_2).ownerOf(_nft) != msg.sender) revert NftGame__NftNotOwned();
                if (user.nftId == _nft && user.collection == COLLECTION2 && user.status == GameState.PLAYING) revert NftGame__NftIdRegistered();
                if (user.nftId == _nft && user.collection == COLLECTION2 && user.status == GameState.DEAD) revert NftGame__NftIsDead();
                user = User(_nft, GameState.PLAYING, _location, _wormLvl, 0, true, collection);
                s_users[COLLECTION1][_nft] = user;
                s_registros.push(user);
                return true;
            } else revert NftGame__WrongCollection();

        } else {

            User memory userToRegister;

            if (_collection == COLLECTION1){
                collection = COLLECTION1;
                if (ERC721(i_nftPlayersAddress_1).ownerOf(_nft) != msg.sender) revert NftGame__NftNotOwned();
                if (user.nftId == _nft && user.collection == COLLECTION1 && user.status == GameState.PLAYING) revert NftGame__NftIdRegistered();
                if (user.nftId == _nft && user.collection == COLLECTION1 && user.status == GameState.DEAD) revert NftGame__NftIsDead();
                s_users[COLLECTION1][_nft].location = _location;
                s_users[COLLECTION1][_nft].status = GameState.PLAYING;
                userToRegister = s_users[COLLECTION1][_nft];
                s_registros.push(userToRegister);
                return true;

            } else if (_collection == COLLECTION2) {
                collection = COLLECTION2;
                user = s_users[collection][_nft];
                if (ERC721(i_nftPlayersAddress_2).ownerOf(_nft) != msg.sender) revert NftGame__NftNotOwned();
                if (user.nftId == _nft && user.collection == COLLECTION2 && user.status == GameState.PLAYING) revert NftGame__NftIdRegistered();
                if (user.nftId == _nft && user.collection == COLLECTION2 && user.status == GameState.DEAD) revert NftGame__NftIsDead();
                s_users[COLLECTION1][_nft].location = _location;
                s_users[COLLECTION1][_nft].status = GameState.PLAYING;
                userToRegister = s_users[COLLECTION1][_nft];
                s_registros.push(userToRegister);
                return true;
            } else revert NftGame__WrongCollection();

            }

    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////// Get game information functions //////////////////////


    function getOwner() external view returns (address) {
        return i_owner;
    }

    ////////////////////// Get the user by Mingle ID
    function getUser(uint256 _nft, bytes32 _collection) external view returns (User memory) {
        return s_users[_collection][_nft];
    }

    ////////////////////// Get Game Status
    function getGameStatus() external view returns (bool) {
        return s_gameStatus;
    }

    ////////////////////// Get Game Paused Status
    function getGamePausedStatus() external view returns (bool) {
        return s_gamePaused;
    }

    ////////////////////// Get NFT Prize contract and ID
    function getPrizeInfo() external view returns (address, uint256) {
        if (s_nftPrizeAddress == address(0)) revert NftGame__NoNftPrizeSet();
        if (s_nftPrizeId == 0) revert NftGame__NoNftPrizeSet();
        return (s_nftPrizeAddress, s_nftPrizeId);
    }

    ////////////////////// Get the address of the NFTs playing
    function getPlayingNFTsAddresses() external view gameHasStarted returns (address, address) {
        if (i_nftPlayersAddress_1 == address(0)) revert NftGame__NoNFTsPlayersAddress();
        if (i_nftPlayersAddress_2 == address(0)) revert NftGame__NoNFTsPlayersAddress();
        return (i_nftPlayersAddress_1, i_nftPlayersAddress_2);
    }

    ////////////////////// Get all registered users
    function getRegisteredUsersCollection() external view gameHasStarted returns (User[] memory) {
        if (s_registros.length == 0) revert NftGame__NoUsersRegistered();
        return s_registros;
    }

    ////////////////////// Get the amount of users registered
    function getAmountOfRegisteredUsers() public view gameHasStarted returns (uint256) {
        return s_registros.length;
    }

    ////////////////////// Get the length of the dead players
    function getDeadNftsLength() external view gameHasStarted returns (uint256) {
        uint256 counter;
        User[] memory registros = s_registros;
        for (uint256 i; i < registros.length; i++){
            if ( s_users[registros[i].collection][registros[i].nftId].status == GameState.DEAD ){
                counter ++;
            }
       }

       return counter;
    }

    ////////////////////// Get the length of the survivors array - Number of participants that must survive on last time to enter raffle
    function getNftsForFinalBattleLength() external view gameHasStarted returns (uint256) {
        uint256 counter;
        User[] memory registros = s_registros;
        for (uint256 i; i < registros.length; i++){
            if ( s_users[registros[i].collection][registros[i].nftId].status == GameState.FINAL_BATTLE ){
                counter ++;
            }
       }

       return counter;
    }

    ////////////////////// Get the length of the survivors array - Number of participants in th raffle
    function getMinglesForRaffleLength() external view gameHasStarted returns (uint256) {
        return s_minglesForRaffle.length;
    }

    ////////////////////// Get the the survivors array - participants in th raffle
    function getMinglesForRaffle() external view gameHasStarted returns (User[] memory) {
        if (s_minglesForRaffle.length == 0) revert NftGame__NoSurvivors();
        return s_minglesForRaffle;
    }

    ////////////////////////////////////////////////////////////////////
    ////////////////////// Revive Mingle function //////////////////////

    ////////////////////// Trigger random chance to revive
    function reviveMingle(uint256 _nft, bytes32 _collection) private gameHasStarted returns (bool) {
        User memory userToCheck = s_users[_collection][_nft];
        address nftAddress;
        if (userToCheck.collection == COLLECTION1){
            nftAddress = i_nftPlayersAddress_1;
        } else {
            nftAddress = i_nftPlayersAddress_2;
        }
        if (ERC721(nftAddress).ownerOf(_nft) != msg.sender) revert NftGame__MingleNotOwned();
        if (userToCheck.revive == false) revert NftGame__MingleCannotRevive();

        User storage user = s_users[_collection][_nft];
        uint256 yourChanceToRevive = user.wormLvl;
        uint256 decition = randomchoices() + 1;
        if (decition <= yourChanceToRevive) {
            
            user.revive = false;
            emit MayahuelRevivedYou(_nft);
            return true;

        } else {
            user.revive = false;
            user.status = GameState.DEAD;
            user.location = DEAD_LOCATION;
            return false;
        }
        
    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////// Battle to dead Mingle function //////////////////////

    ////////////////////// Trigger random choice to survive
    function choice(uint256 _nft, bytes32 _location, bytes32 _collection, uint256 _choice) external gameHasStarted notPaused noContract returns (bool){
        
        User memory userToCheck = s_users[_collection][_nft];
        address nftAddress;
        if (userToCheck.collection == COLLECTION1){
            nftAddress = i_nftPlayersAddress_1;
        } else {
            nftAddress = i_nftPlayersAddress_2;
        }
        
        if (ERC721(nftAddress).ownerOf(_nft) != msg.sender) revert NftGame__MingleNotOwned();
        if (userToCheck.status == GameState.DEAD) revert NftGame__NftIsDead();
        if (userToCheck.stage == 6) revert NftGame__AlreadyASurvivor();

        uint256 num;
        if (userToCheck.location == PATIO && _choice == 0){
            num = 15;
        } else if (userToCheck.location == PATIO && _choice == 1) {
            num = 10;
        } else if (userToCheck.location == BACK_DOOR_TUNNELS && _choice == 0) {
            num = 15;
        } else if (userToCheck.location == BACK_DOOR_TUNNELS && _choice == 1) {
            num = 10;
        } else if (userToCheck.location == MAIN_HALL && _choice == 0) {
            num = 10;
        } else if (userToCheck.location == MAIN_HALL && _choice == 1) {
            num = 15;
        } else if (userToCheck.location == OVEN_ROOM && _choice == 0) {
            num = 25;
        } else if (userToCheck.location == OVEN_ROOM && _choice == 1) {
            num = 15;
        } else if (userToCheck.location == DISTILLERY_ROOM && _choice == 0) {
            num = 18;
        } else if (userToCheck.location == DISTILLERY_ROOM && _choice == 1) {
            num = 25;
        } else if (userToCheck.location == BARREL_ROOM && _choice == 0) {
            num = 15;
        } else if (userToCheck.location == BARREL_ROOM && _choice == 1) {
            num = 20;
        } else if (userToCheck.location == FERMENTATION_ROOM && _choice == 0) {
            num = 26;
        } else if (userToCheck.location == FERMENTATION_ROOM && _choice == 1) {
            num = 15;
        } else if (userToCheck.location == PRIVATE_CAVA && _choice == 0) {
            num = 20;
        } else if (userToCheck.location == PRIVATE_CAVA && _choice == 1) {
            num = 25;
        } else if (userToCheck.location == HALL1 && _choice == 0) {
            num = 25;
        } else if (userToCheck.location == HALL1 && _choice == 1) {
            num = 18;
        } else if (userToCheck.location == HALL2 && _choice == 0) {
            num = 18;
        } else if (userToCheck.location == HALL2 && _choice == 1) {
            num = 24;
        } else if (userToCheck.location == HALL3 && _choice == 0) {
            num = 25;
        } else if (userToCheck.location == HALL3 && _choice == 1) {
            num = 18;
        } else if (userToCheck.location == RAVEN_NEST && _choice == 0) {
            num = 20;
        } else if (userToCheck.location == RAVEN_NEST && _choice == 1) {
            num = 40;
        } else if (userToCheck.location == RAVEN_NEST && _choice == 2) {
            num = 30;
        } else if (userToCheck.location == RAVEN_NEST && _choice == 3) {
            num = 25;
        } else if (userToCheck.location == RAVEN_NEST && _choice == 4) {
            num = 25;
        } else revert NftGame__WrongChoiceInput();

        User storage user = s_users[_collection][_nft];
        uint256 randomNumber = randomchoices() + 1; 
        if (randomNumber > num) {
            user.status = GameState.PLAYING;
            user.location = _location;
            user.stage ++;

            if (user.stage == 6){
                user.status = GameState.FINAL_BATTLE;
            }
            return true;
        } else if (randomNumber <= num && user.revive == true) {

            return reviveMingle(_nft, _collection);

        } else if (randomNumber <= num && user.revive == false) {
            user.status = GameState.DEAD;
            user.location = DEAD_LOCATION;
            return false;
        }
        return false;
        
    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////// Battle to dead Mingle function //////////////////////

    ////////////////////// Trigger random choice to survive
    function escapeChoice(uint256 _nft, bytes32 _location, bytes32 _collection) external gameHasStarted noContract returns (bool){

        User memory userToCheck = s_users[_collection][_nft];
        
        if (userToCheck.stage < 6) revert NftGame__NotASurvivor();
        
        address nftAddress;
        if (userToCheck.collection == COLLECTION1){
            nftAddress = i_nftPlayersAddress_1;
        } else {
            nftAddress = i_nftPlayersAddress_2;
        }

        if (ERC721(nftAddress).ownerOf(_nft) != msg.sender) revert NftGame__MingleNotOwned();
        if (userToCheck.status == GameState.DEAD) revert NftGame__NftIsDead();
        if (s_gamePaused == false) revert NftGame__GameMustBePaused();

        uint256 percentageToDie = 80;
        User storage user = s_users[_collection][_nft];
        uint256 randomNumer = randomchoices() + 1;
        if (randomNumer > percentageToDie) {
            user.status = GameState.IN_RAFFLE;
            user.location = _location;
            user.stage ++;

            s_minglesForRaffle.push(user);

            return true;

        } else if (randomNumer <= percentageToDie && user.revive == true) {
                
            return reviveMingle(_nft, _collection);

        } else if (randomNumer <= percentageToDie && user.revive == false) {

            user.status = GameState.DEAD;
            user.location = DEAD_LOCATION;
            return false;

        }
        return false;
        
    }

    ////////////////////// Trigger random choice to compare with "dead" function
    function randomchoices() private view returns (uint256) {
        uint256 num = 100;
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp,
                        num
                    )
                )
            ) % num;
    }

    ///////////////////////////////////////////////////////////////////////
    ////////////////////// Final Step game functions //////////////////////

    ////////////////////// Select a winner and send prize (NFT) automatically to winner address
    function selectWinner() external gameHasStarted onlyOwner noContract returns (uint256) { //payable?
        if (s_gamePaused == false) revert NftGame__GameMustBePaused();
        if (s_minglesForRaffle.length == 0) revert NftGame__NoSurvivors();

        ERC721 playerNft1 = ERC721(i_nftPlayersAddress_1);
        ERC721 playerNft2 = ERC721(i_nftPlayersAddress_2);
        ERC721 prizeNft = ERC721(s_nftPrizeAddress);

        if (s_minglesForRaffle.length == 1) {
            if (s_minglesForRaffle[0].collection == COLLECTION1){
                address onlyWinner = playerNft1.ownerOf(s_minglesForRaffle[0].nftId);
                prizeNft.transferFrom(address(this), onlyWinner, s_nftPrizeId);
                uint256 winner1 = s_minglesForRaffle[0].nftId;
                bytes32 winnerCollection = s_minglesForRaffle[0].collection;
                emit WinnerSelected(winner1, winnerCollection);

                return winner1;
            } else {
                address onlyWinner = playerNft2.ownerOf(s_minglesForRaffle[0].nftId);
                prizeNft.transferFrom(address(this), onlyWinner, s_nftPrizeId);
                uint256 winner1 = s_minglesForRaffle[0].nftId;
                bytes32 winnerCollection = s_minglesForRaffle[0].collection;
                emit WinnerSelected(winner1, winnerCollection);

                return winner1;
            }
            
        }

        uint256 winnerIndex = random() % s_minglesForRaffle.length;
        User memory winner = s_minglesForRaffle[winnerIndex];
        if (winner.collection == COLLECTION1){
            address winnerAddress = playerNft1.ownerOf(winner.nftId);
            prizeNft.transferFrom(address(this), winnerAddress, s_nftPrizeId);

            emit WinnerSelected(winner.nftId, winner.collection);

            
            return winner.nftId;
        } else {
            address winnerAddress = playerNft2.ownerOf(winner.nftId);
            prizeNft.transferFrom(address(this), winnerAddress, s_nftPrizeId);

            emit WinnerSelected(winner.nftId, winner.collection);

            
            return winner.nftId;
        }
        
    }

    ////////////////////// Random choice to trigger in winner function
    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp,
                        s_minglesForRaffle.length
                    )
                )
            );
    }

    ////////////////////// Reset game
    function resetGame() external gameHasStarted onlyOwner noContract {
        if (s_gamePaused == false) revert NftGame__GameMustBePaused();

        emit GameEnded(getAmountOfRegisteredUsers(), block.timestamp);

        User[] memory registros = s_registros;

        for (uint256 i; i < registros.length; i++) {
            s_users[registros[i].collection][registros[i].nftId].status = GameState.WAITING_NEXT_ROUND;
            s_users[registros[i].collection][registros[i].nftId].revive = true;
            s_users[registros[i].collection][registros[i].nftId].stage = 0;
            s_users[registros[i].collection][registros[i].nftId].location = "";
        }

        delete s_registros;
        delete s_minglesForRaffle;
        s_gamePaused = false;
        s_nftPrizeAddress = address(0);
        s_nftPrizeId = 0;
        s_gameStatus = false;
    }

    //////////////////////////////////////////////////////////////////////////
    ////////////////////// OnlyOwner contract functions //////////////////////

    function withdrawBalance() external onlyOwner noContract {
        uint256 balanceOfContract = getBalance();
        if (balanceOfContract <= 0) revert NftGame__NoBalanceInContract();
        payable(i_owner).transfer(address(this).balance);
        emit BalanceWithdrawn(balanceOfContract);
    }

    ////////////////////////////////////////////////////////////////
    ////////////////////// Contract functions //////////////////////

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    ////////////////////////////////////////////////////////////////
    ////////////////////// Receive and Fallback //////////////////////
    // Ether is sent to contract
    //      is msg.data empty?
    //          /   \
    //         yes  no
    //         /     \
    //    receive()?  fallback()
    //     /   \
    //   yes   no
    //  /        \
    //receive()  fallback()

    // Function to receive Ether. msg.data must be empty
    receive() external payable {fund();}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {fund();}

}