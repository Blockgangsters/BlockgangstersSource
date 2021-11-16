import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import solidity from 'react-syntax-highlighter/dist/esm/languages/prism/solidity';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { PageWrapper } from '../../globalStyles'

import { PDFContainer } from './Contract.elements';

SyntaxHighlighter.registerLanguage('solidity', solidity);


const Contract = () => {
    const codeString = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";
import "./ganghelper.sol";
//import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Token is ERC20("Blockgangsters", "GANG"), helperContract, VRFConsumerBase {

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomNumber;

        constructor ()
        VRFConsumerBase(
            0x3d2341ADb2D31f1c5530cDC622016af293177AE0, // VRF Coordinator
            0xb0897686c545045aFc77CF20eC7A532E3120E0F1  // LINK Token
        )

        {
            keyHash = 0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da;
            fee = 0.0001 * 10 ** 18; // 0.1 LINK (Varies by network)

            initVestingStages();
            _mint(address(this), vesterSupply);
            _mint(owner, 92500000* 10 ** 18); // 92.5 giveaway
    }

    modifier onlyOwners () {
        require(msg.sender == owner,'Only owner');
        _;
    }

    modifier onlyActive () {
        require(activePlayer[msg.sender] != 0,'Only active player');
        _;
    }

    // --------------------------------  VARIABLES TO BE SET BEFORE LAUNCH ----------------------------------------
    address public owner = 0x212057855F52669966a472Dc48B543dEEFE32A38;
    uint public vesterSupply = 180000000000 * 10 ** 18; //total amount of tokens available to team over lifetime (= 180B)
    uint256 vestingStartTimestamp = 1635721200; // Testnet stamp = 1 Nov 21

    // ------------------------------------------  BOOTSTRAP SETTINGS -----------------------------------------------
    uint bootstrapLimit = 501e18; // put limit just over 0.5 to prevent rounding errors/annoyance
    uint bootstrapClosed = 1640991600; // (31 dec 2021)
    uint256 conversionRate = 1000000; // we want 0.5ETH = 1B --> ether * 2B || in matic: 1000 MATIC = 1B --> 1 MATIC = 1M

    // ------------------------------------------  IN-GAME SETTINGS -----------------------------------------------
    // settings changed for testnet to test all functionality as quick as possible, change back before mainnet launch.
    uint8[5] famAttBonuses = [0, 5, 10, 20, 40];
    uint64[4] famAttCosts = [1000000000, 2000000000, 4000000000, 8000000000];
    uint8[3] famDefBonuses = [0, 10, 20];
    uint64[2] famDefCosts = [2000000000, 4000000000];

    uint trainingAddAttack = 500000;
    uint trainingAddDefense = 500000;
    uint statsTrainingCooldown = 86400;
    uint jailTime = 21600;
    uint attorneyTime = 21600;
    uint crowdFundTime = 2629743; // (1 month)
    uint crimeTime = 7200; // (2 hours)
    uint attackTime = 7200;
    uint orgAttackTime = 86400;
    uint safetyTime = 100; // (safety net)

    // --------------------  Declaration of events --------------------------
    event tokensVested(address indexed receiver, uint256 indexed amount);
    event bootstrapBought(address indexed sender, uint256 indexed amount, uint256 indexed used);
    event tokensDeposited(address indexed sender, uint256 indexed amount);
    event tokensWithdrawn(address indexed sender, uint256 indexed amount);
    event newPlayerAdded(address indexed sender); // when a player deposits ingame from 0 balance, a new player has entered the game
    event joinedFamily(address indexed member, uint indexed familyId);
    event familyStarted(bytes32 indexed name, address indexed owner);
    event playerAttacked(bool successAttack, address indexed attacker, address indexed defender, uint loot, uint indexed attackStamp);
    event playerJailed(address indexed player, uint indexed stamp);
    event fundsDistributed(uint indexed familyIndex, uint indexed amount);
    event fundsDeposited(uint indexed familyIndex, address indexed player, uint indexed amount);

    event trainedStats(uint indexed choice, address indexed trainer, uint indexed newxp);
    event boughtProtection(address indexed player, uint indexed, uint indexed timestamp);
    event newFamilyRank(uint indexed newFamilyRank);
    event ethDeposited(address indexed sender, uint256 indexed amount);
    event withdrawnBalance(uint256 indexed amount);
    event playerRemoved(address indexed player);
    event crowdFundGains(address indexed player, uint indexed rewardfunding);
    event crimeResult(address indexed player, bool indexed crimeSuccess, uint crimeLoot, uint indexed crimeStamp);
    event newFamilyItems(uint indexed familyIndex, uint indexed familyAttBonus, uint indexed familyDefBonus);
    event attorneyHired(uint indexed result, address indexed player, uint indexed payOrCompensation); // index 1: 0= fail; 1 = success and pay fee; 2 = success and compensation. index 2: fee/compensation
    event organizedAttackResult(uint indexed familyIndex, uint indexed successOrgAttack, uint indexed orgAttackLoot);
    // ----------------------------------------------------------------------
    // -------------------  Declaration of variables -------------------------
    // ----------------------------------------------------------------------
    mapping (address => uint) claimedLogbook; // This mapping stores the vested Percentage'
    mapping (address => uint) internal boughtBootstrap; // this mapping stores the amount bought in Bootstrap of each participant
    mapping (address => uint) internal ingameBalances; // we need users to actively deposit funds into the contract, otherwise we cannot change balances (selling/approving etc)
    mapping(address => uint) internal ingameBalancesIndex; // we need to track which wallets are holding GANG
    mapping(address => uint) internal activePlayer; // limit access to functions when not an active player with onlyActive modifier

    mapping(address => uint) internal defenseXP; // def XP per account
    mapping(address => uint) internal protectionTime; // protect account from attacks
    mapping(address => uint) internal attackXP; // att XP per account
    mapping(address => uint) internal attackStamp; //
    mapping(address => uint) internal jailStamp; // if jailed we need to know when -> + 6 hours until release
    mapping(address => uint) internal attackPlayerInitiated; // if jailed we need to know when -> + 6 hours until release
    mapping(address => uint) internal attorneyInitiated; // if jailed we need to know when -> + 6 hours until release
    mapping(address => uint) internal attorneyStamp; // only hire an attorney once per jailing
    mapping(address => uint) internal crowdFundStamp; // stamp of crowdfundstart
    mapping(address => uint) internal crowdFundAmount; // amount invested (subtract from ingamefunds)
    mapping(address => uint) internal crowdFundChoice; // stable / growth / speculative
    mapping(address => uint) internal crowdFundActive; // dont start new campaign when current is active (claim first)
    mapping(address => uint) internal crowdFundingInitiated; // dont start new campaign when current is active (claim first)
    mapping(address => uint) internal lastWithdraw; // last withdrawal timestamp
    mapping(address => uint) internal lastTraining; // last withdrawal timestamp
    mapping(address => uint) internal missionStamp; // last mission timestamp
    mapping(address => address) internal revengeAttack; // attack last attacker
    mapping(address => bool) internal revengeFlag; // attack last attacker
    mapping(uint => uint) internal orgAttackStamp; // last mission timestamp

    mapping(address => uint) internal crimeNumber; // required to save crimeNumber after VRF request
    mapping(address => uint) internal orgAttackInitiated; // extra safety not to spam LINK
    // Chainlink VRF mappings to keep track of requests
    mapping(bytes32 => address) internal requestToAddress;
    mapping(bytes32 => uint) internal requestToMissionType;
    uint8[5] requestsPerFunction = [4, 1, 2, 2, 3]; // e.g. attackrandomplayer needs 3 requests -> logged here
    mapping(bytes32 => uint[]) internal randomnessArray; // mapping from requestId to an array containing multiple results

    uint familyIndex = 1; // start at index 1 --> we use index 0 to indicate not part of a family
    uint bootstrapTotal = 0; // max 150B tokens
    uint bootstrapTotalClosed = 0; // close when 150 reached
    mapping(address => uint) internal familyRank;
    mapping(address => uint) internal memberOfFamilyIndex; // dont start new campaign when current is active (claim first)
    mapping(uint => uint) internal familyDefBonus;
    mapping(uint => uint) internal familyAttBonus;
    mapping(uint => uint) internal familyBank;
    mapping(uint => uint) internal familyUnderbossClaimed;

    struct familyData {
        uint familyIndexNew;
        bytes32 familyName;
        uint familyEntreeFee;
        uint familyMissionFee;
        address familyOwner;
        address[] familyMembers;
    }
    mapping (uint => familyData) internal familydatamapping;

    address[] public activePlayers; // array containing all active addresses (balance > 0)

    uint randNonce;

    VestingStage[5] public stages; // create array to store vesting stages
    uint bootstrapUsed;  // amount of times the bootstrap is used

    struct VestingStage {
        uint256 date;
        uint256 tokensUnlocked;
    }

    // ----------------------------------------------------------------------
    // -------------------  Vesting related functions  ----------------------
    // ----------------------------------------------------------------------
    function initVestingStages () internal {
        uint256 QOfYear = 91 days;
        stages[0].date = vestingStartTimestamp;
        stages[1].date = vestingStartTimestamp + QOfYear;
        stages[2].date = vestingStartTimestamp + QOfYear * 2;
        stages[3].date = vestingStartTimestamp + QOfYear * 3;
        stages[4].date = vestingStartTimestamp + QOfYear * 4;
        stages[0].tokensUnlocked = 36000000000 * 10 ** 18;
        stages[1].tokensUnlocked = 72000000000 * 10 ** 18;
        stages[2].tokensUnlocked = 108000000000 * 10 ** 18;
        stages[3].tokensUnlocked = 144000000000 * 10 ** 18;
        stages[4].tokensUnlocked = 180000000000 * 10 ** 18;
    }

    function getVesting() external onlyOwners returns (uint) {
        uint toSend;
        for (uint i = 0; i < stages.length; i++) {
            if (msg.sender == owner && stages[i].date < block.timestamp) {
                toSend = stages[i].tokensUnlocked; // iterating so always take the biggest available value
            }
        }
        toSend -= claimedLogbook[msg.sender];
        _transfer(address(this), msg.sender, toSend);
        claimedLogbook[msg.sender] += toSend;
        emit tokensVested(msg.sender, toSend);
        return toSend;
    }

    function getClaimed() external view returns (uint) {
        return claimedLogbook[msg.sender];
    }

    // ----------------------------------------  Bootstrap   -------------------------------------------------
    function receiveEth(uint choice) payable external {
        if (choice == 1) { //access to Bootstrap
            require(msg.value > 1 * 10 ** 17, "Min 5 Matic"); // tested 21 aug 21, change mainnet to 5^18
            require(block.timestamp < bootstrapClosed, "Closed"); // tested 21 aug 21
            require(bootstrapTotalClosed == 0, "Cap"); // all tokens are sold
            require((boughtBootstrap[msg.sender] + msg.value) <= bootstrapLimit, "max 1000 matic"); // tested 21 aug 21
            require(bootstrapUsed < 1000, "1000 slots max");
            if (boughtBootstrap[msg.sender] == 0) {
                bootstrapUsed += 1;
            }
            if (bootstrapTotal > 150000 * 10 ** 18) {
                bootstrapTotalClosed = 1; // close the bootstrapping since 150B tokens are sold
            }
            boughtBootstrap[msg.sender] += msg.value;
            bootstrapTotal += msg.value;
            emit bootstrapBought(msg.sender, msg.value, bootstrapUsed);
            _mint(msg.sender, msg.value*conversionRate);
        }
        emit ethDeposited(msg.sender, msg.value);
    }

    function transferETH(address payable to) external onlyOwners {
        to.transfer(address(this).balance);
        emit withdrawnBalance(address(this).balance);
    }
    // ----------------------------------------  Transfer to game   -------------------------------------------------
    function depositFunds(uint amount) external {
        _burn(msg.sender, amount * 10 ** 18);
        emit tokensDeposited(msg.sender, amount);
        ingameBalances[msg.sender] += amount;
        addPlayers();
    }

    function withdrawFunds(uint amount) onlyActive external {
        require(ingameBalances[msg.sender] >= amount, "Balance"); // tested 21 aug 21
        require(lastWithdraw[msg.sender] <= block.timestamp - 604800, "1/week"); // only withdraw once per week
        emit tokensWithdrawn(msg.sender, amount);
        ingameBalances[msg.sender] -= amount; //
        lastWithdraw[msg.sender] = block.timestamp; // set last withdrawdate to now.
        _mint(msg.sender, amount* 10 ** 18);
        removePlayers();
    }

    function getingameFunds(address playerAddress) public view returns (uint) {
        return ingameBalances[playerAddress];
    }

    function addPlayers() internal {
        uint playerFound;
        if (activePlayers.length > 0) {
            for (uint i = 0; i < activePlayers.length; i++) {
                if (activePlayers[i] == msg.sender) {
                    playerFound = 1;
                }
            }
            if (playerFound == 0) {
                activePlayers.push(msg.sender);
                emit newPlayerAdded(msg.sender);
                ingameBalancesIndex[msg.sender] = activePlayers.length - 1; // log the index of each address
            }
        } else {
            activePlayers.push(msg.sender);
            emit newPlayerAdded(msg.sender);
            ingameBalancesIndex[msg.sender] = activePlayers.length - 1; // log the index of each address
        }
        activePlayer[msg.sender] = 1; // player is marked active
    }

    function removePlayers() internal {
        if (ingameBalances[msg.sender] == 0) {
            uint indexToSwap = ingameBalancesIndex[msg.sender]; // index of (current) removed player
            address playerToAdd = activePlayers[activePlayers.length -1]; // playertoadd is the player in the last index of active players
            ingameBalancesIndex[playerToAdd] = indexToSwap; // set index of last index to index of insertion
            activePlayers[indexToSwap] = playerToAdd; // last index player is inserted in place of removed player
            ingameBalancesIndex[msg.sender] = 999999999; // cleaning up to be sure.
            activePlayers.pop(); // delete last element of activeplayers
        }
        activePlayer[msg.sender] = 0; // player is marked inactive
        emit playerRemoved(msg.sender);
    }

    // -------------------------------------------  CHAINLINK VRF Functions  ---------------------------------------------------------
    function getRandomNumber(uint randomRequestFunction) internal returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Need LINK");
        bytes32 requestToAddressmapping = requestRandomness(keyHash, fee);
        requestToAddress[requestToAddressmapping] = msg.sender;
        requestToMissionType[requestToAddressmapping] = randomRequestFunction;
        return requestToAddressmapping;
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        for (uint i = 0; i < requestsPerFunction[requestToMissionType[requestId]-1]; i++) {
            randomnessArray[requestId].push(uint256(keccak256(abi.encode(randomness, i))));
        }
        if (requestToMissionType[requestId] == 1) {
            address attackInitiator = requestToAddress[requestId];
            address defenderAddress;
            uint attackIndex;
            if (revengeFlag[attackInitiator] == false) {
                attackIndex = randomnessArray[requestId][0] % activePlayers.length; //index of player to attack
                defenderAddress = activePlayers[attackIndex];
            } else {
                defenderAddress = revengeAttack[attackInitiator];
            }

            uint rollAttack = randomnessArray[requestId][1] % 101; // roll to figure out succesful or not
            uint rollLoot = randomnessArray[requestId][2] % 100; // roll to see how much is stolen
            uint jailRoll = randomnessArray[requestId][3] % 100; // 50% chance to end up in jail
            if (activePlayers[attackIndex] == attackInitiator) {
                if (attackIndex == 0) {
                    attackIndex += 1; // index 0 so need to increase by 1
                } else {
                    attackIndex -= 1; // if not 0 safely reduce by 1
                }
            }
            uint attackChance = attChance[getAttackXP(attackInitiator)/1000000];
            uint defenseChance =  defChance[getDefenseXP(defenderAddress)/1000000];
            uint chanceSuccess;
            revengeAttack[defenderAddress] = attackInitiator;

            if (attackChance > defenseChance) {
                chanceSuccess =  attackChance - defenseChance;
            } else {
                chanceSuccess = 0;
            }
            if (rollAttack < chanceSuccess && protectionTime[defenderAddress]<block.timestamp) {
                attackXP[attackInitiator] += 100000; // 100K XP on succesful attack
                uint totalLoot = lootPercentage[rollLoot] * ingameBalances[defenderAddress] /1000; //remember 1000 = 100%, so we need to calc back to percentages.
                if (memberOfFamilyIndex[attackInitiator] != 0) { // pay family fees
                    ingameBalances[attackInitiator] += totalLoot*(100-familydatamapping[memberOfFamilyIndex[attackInitiator]].familyMissionFee)/100;
                    familyBank[memberOfFamilyIndex[attackInitiator]] += totalLoot*familydatamapping[memberOfFamilyIndex[attackInitiator]].familyMissionFee/100;
                } else {
                    ingameBalances[attackInitiator] += totalLoot;
                }
                ingameBalances[defenderAddress] -= totalLoot;
                emit playerAttacked(true, attackInitiator, defenderAddress, totalLoot, block.timestamp); // 1 is attack success
            } else {
                uint failFee = ingameBalances[attackInitiator]*100/5000; // pay 2% of ingamefunds as fee (min 1 M)
                if (failFee < 1000000) {
                    failFee = 1000000;
                }
                 ingameBalances[attackInitiator] -= failFee;
                if (jailRoll < 50) {
                    jailStamp[attackInitiator] = block.timestamp + jailTime;
                    emit playerJailed(attackInitiator, jailStamp[attackInitiator]);
                }
                emit playerAttacked(false, attackInitiator, defenderAddress, failFee, block.timestamp); // 0 is attack failed
            }
        } else if (requestToMissionType[requestId] == 2) {
            address attorneyInitiator = requestToAddress[requestId];
            uint attorneyRoll = randomnessArray[requestId][0] % 100; //index of player to attack
            if (attorneyRoll < 50) {
                emit attorneyHired(0, attorneyInitiator, 0); // it failed
            } else if (attorneyRoll < 75) {
                ingameBalances[attorneyInitiator] -= 50000 + 10000 * (defenseXP[attorneyInitiator] + attackXP[attorneyInitiator])  /1000000;
                jailStamp[attorneyInitiator] = 0; // released from jail
                emit attorneyHired(1, attorneyInitiator, 50000 + 10000 * (defenseXP[attorneyInitiator] + attackXP[attorneyInitiator])  /1000000); // index 1: 1 = success but pay. index 2: payment
            } else {
                uint bonusPayment = ingameBalances[attorneyInitiator]*2/100 + 50000000;
                ingameBalances[attorneyInitiator] += bonusPayment;
                jailStamp[attorneyInitiator] = 0; // released from jail
                emit attorneyHired(2, attorneyInitiator, bonusPayment); // index 1: 2 = success and compensation. index 2: compensation
            }
        } else if (requestToMissionType[requestId] == 3) {
            address crowdFundInitiator = requestToAddress[requestId];
            uint crowdFundRoll = randomnessArray[requestId][0] % 100;
            uint bonusRoll = randomnessArray[requestId][1] % 100;
            uint crowdFundReward;
            if (crowdFundChoice[crowdFundInitiator] == 1) { // stable
                if (crowdFundRoll < 90) {
                    // as expected
                    crowdFundStamp[crowdFundInitiator] = 0;
                    crowdFundReward = crowdFundAmount[crowdFundInitiator]*105/100;
                } else if (crowdFundRoll < 92) {
                    // outperforming
                     crowdFundStamp[crowdFundInitiator] = 0;
                     crowdFundReward = crowdFundAmount[crowdFundInitiator]*(105+(bonusReturn[bonusRoll]/10))/100;
                } else {
                    // bankruptcy (no update to ingamebalances, but reset crowdfundtimer)
                    crowdFundStamp[crowdFundInitiator] = 0;
                }
            } else if (crowdFundChoice[crowdFundInitiator] == 2) { // growth
                 if (crowdFundRoll < 60) {
                    // as expected
                    crowdFundStamp[crowdFundInitiator] = 0;
                    crowdFundReward = crowdFundAmount[crowdFundInitiator]*105/100;
                } else if (crowdFundRoll < 70) {
                    // outperforming
                     crowdFundStamp[crowdFundInitiator] = 0;
                     crowdFundReward = crowdFundAmount[crowdFundInitiator]*(105+(bonusReturn[bonusRoll]/10))/100;
                } else {
                    // bankruptcy (no update to ingamebalances, but reset crowdfundtimer)
                    crowdFundStamp[crowdFundInitiator] = 0;
                }
            } else { // speculative (use speculativeReturn)
                if (crowdFundRoll < 22) {
                    // outperforming
                     crowdFundStamp[crowdFundInitiator] = 0;
                     crowdFundReward = crowdFundAmount[crowdFundInitiator]*(105+(bonusReturn[bonusRoll]/10))/100;
                } else {
                    // bankruptcy (no update to ingamebalances, but reset crowdfundtimer)
                    crowdFundStamp[crowdFundInitiator] = 0;
                }
            }
            ingameBalances[crowdFundInitiator] += crowdFundReward;
            crowdFundActive[crowdFundInitiator] = 0; // campaign claimed, open for new campaign
            crowdFundAmount[crowdFundInitiator] = 0; // completeness
            emit crowdFundGains(crowdFundInitiator, crowdFundReward);
        } else if (requestToMissionType[requestId] == 4) {
            fulfillCrime(requestId);
        } else if (requestToMissionType[requestId] == 5) {
            fulfillOrganizedAttack(requestId);
        }
        randomNumber = randomness;
    }

    // --------------------------------------  In-game missions/functions  -----------------------------------------------------------

    function getDefenseXP(address account) public view returns (uint) {
        if (defenseXP[account] > 100000000) {
            return 100000000;
        } else {
            return defenseXP[account]; // exp/1M is level
        }
    }

    function getAttackXP(address account) public view returns (uint) {
        if (attackXP[account] > 100000000) {
            return 100000000;
        } else {
            return attackXP[account]; // exp/1M is level
        }
    }

    function getActiveList() external view returns (address [] memory) {
        return activePlayers;
    }

    function statsTraining(uint choice) external {
        require(lastTraining[msg.sender] <= block.timestamp - statsTrainingCooldown, "Rest");
        require(choice == 1 || choice == 2 || choice == 3, "invalid"); // revert not necessary but for completeness added
        if (activePlayer[msg.sender] == 0) {
            addPlayers();
        }
        lastTraining[msg.sender] = block.timestamp;
        if (choice == 1) {
            attackXP[msg.sender] += trainingAddAttack;
            emit trainedStats(1, msg.sender, attackXP[msg.sender]);
        } else if (choice == 2) {
            attackXP[msg.sender] += trainingAddAttack/2;
            defenseXP[msg.sender] += trainingAddDefense/2;
            emit trainedStats(1, msg.sender, attackXP[msg.sender]);
            emit trainedStats(2, msg.sender, defenseXP[msg.sender]);
        } else if (choice == 3) {
            defenseXP[msg.sender] += trainingAddDefense;
            emit trainedStats(2, msg.sender, defenseXP[msg.sender]);
        }
    }

    function buyProtection(uint time) external onlyActive {
        require(ingameBalances[msg.sender] > 10000000, "only richer");
        // time to cover is in days. As such, first calculate end-time.
        uint endTime = block.timestamp + 86400*time;
        // 86400 = 1 day, lets put 1 day at 1% of balance
        require(ingameBalances[msg.sender] > time/100);
        protectionTime[msg.sender] = endTime;
        ingameBalances[msg.sender] -= ingameBalances[msg.sender]*time/100;
        emit boughtProtection(msg.sender, time, block.timestamp);

    }

    function attackRandomPlayerRequest(address revenge) external onlyActive {
        require(ingameBalancesIndex[msg.sender] < 999999999, "Not active");
        require(ingameBalances[msg.sender] > 1000000, "1M Gang");
        require(jailStamp[msg.sender] < block.timestamp, "jail");
        require(attackStamp[msg.sender] < block.timestamp-attackTime, "resting");
        require(activePlayers.length > 1, "no other players to attack");
        require(attackPlayerInitiated[msg.sender] < block.timestamp - safetyTime, "safety");
        attackPlayerInitiated[msg.sender] = block.timestamp;
        // first request the random numbers, then split up the function to fulfill request after Chainlink answers
        attackStamp[msg.sender] = block.timestamp;
        if (revenge == 0x000000000000000000000000000000000000dEaD) {
            revengeFlag[msg.sender] = false;
        } else {
            revengeFlag[msg.sender] = true;
        }
        getRandomNumber(1);
    }




    function getJailStatus() external view onlyActive returns (uint, uint, uint, uint) {
        uint jailStatus;
        uint attorneyStatus;
        if (jailStamp[msg.sender] <= block.timestamp) {
            jailStatus = 1; // otherwise stay 0
        }
        if (attorneyStamp[msg.sender] <= block.timestamp - attorneyTime) {
            attorneyStatus = 1;
        }
        uint jailBlocks;
        uint attorneyBlocks;
        if (jailStatus == 0) {
            jailBlocks = jailStamp[msg.sender] - block.timestamp;
        }
        if (attorneyStatus == 0) {
            attorneyBlocks = attorneyTime - (block.timestamp - attorneyStamp[msg.sender]);
        }

        return (jailStatus, attorneyStatus, jailBlocks, attorneyBlocks); // first index: jailed (0) or not jailed (1), second index: attorney available (no=0, yes=1)
    }

    function getAttackStatus() external view returns (uint) {
        return attackStamp[msg.sender];
    }

    function getCrimeStatus() external view returns (uint) {
        return missionStamp[msg.sender];
    }

    function getCrowdfundStatus() external view returns (uint, uint) {
        if (crowdFundStamp[msg.sender] < block.timestamp - crowdFundTime && crowdFundActive[msg.sender] == 0) {
            return (0, 0); // finished + claimed
        } else if (crowdFundStamp[msg.sender] < block.timestamp - crowdFundTime && crowdFundActive[msg.sender] == 1) {
            return (1, 0); // finished + unclaimed
        } else {
            return (1, crowdFundStamp[msg.sender]); // in progress + timestamp
        }
    }

    function hireAttorney() external onlyActive {
        require(ingameBalances[msg.sender] > (50000 + 10000 * (defenseXP[msg.sender] + attackXP[msg.sender])  /1000000), "A fund");
        require(jailStamp[msg.sender] >= block.timestamp, "Not jailed");
        require(attorneyStamp[msg.sender] <= block.timestamp - attorneyTime, "A used");
        require(attorneyInitiated[msg.sender] < block.timestamp - safetyTime, "extra safety");
        attorneyInitiated[msg.sender] = block.timestamp;
        attorneyStamp[msg.sender] = block.timestamp;
        getRandomNumber(2); // fix getRandomNumber sequencing
    }



    function crowdFundStart(uint amount, uint choice) external onlyActive {
        require(ingameBalances[msg.sender] > amount, "C fund");
        require(crowdFundStamp[msg.sender] < block.timestamp - crowdFundTime, "Still inv");  // 2629743 sec = 1 month
        require(choice == 1 || choice == 2 || choice == 3, "Inv C");
        require(crowdFundActive[msg.sender] == 0, "Claim first"); // use crowdFundingReturn() before starting another
        // function to lock into a crowdfunding campaign
        crowdFundAmount[msg.sender] = amount;
        ingameBalances[msg.sender] -= amount;
        crowdFundStamp[msg.sender] = block.timestamp;
        crowdFundChoice[msg.sender] = choice;
        crowdFundActive[msg.sender] = 1; // campaign active
    }

    function crowdFundingReturn() external onlyActive { // trigger this function to get the returns of current campaign
        require(crowdFundStamp[msg.sender] < block.timestamp - crowdFundTime, "Inv waiting");  // 2629743 sec = 1 month
        require(crowdFundStamp[msg.sender] != 0, "Idle");
        require(crowdFundAmount[msg.sender] > 0, "Am 0");
        require(crowdFundingInitiated[msg.sender] < block.timestamp - safetyTime, "extra safety");
        crowdFundingInitiated[msg.sender] = block.timestamp;
        getRandomNumber(3); // fix getRandomNumber sequencing
    }

    function crimeStart(uint crime) external onlyActive {
        require(crime == 1 || crime == 2 || crime == 3 || crime == 4 || crime == 5, "Invalid");
        require(jailStamp[msg.sender] < block.timestamp, "jail");
        require(missionStamp[msg.sender] < block.timestamp - crimeTime, "Resting");
        crimeNumber[msg.sender] = crime;
        if (crime == 2) {
            require(attackXP[msg.sender]/1000000 >= 20, "A lvl low");
        } else if (crime == 3) {
            require(attackXP[msg.sender]/1000000 >= 30, "A lvl low");
        } else if (crime == 4) {
            require(attackXP[msg.sender]/1000000 >= 40, "A lvl low");
        } else if (crime == 5) {
            require((attackXP[msg.sender]/1000000 + defenseXP[msg.sender]/1000000) > 80, "80 lvl");
        }
        // immediately set stamps to make sure user doesn't spam requests
        missionStamp[msg.sender] = block.timestamp;
        getRandomNumber(4); // fix getRandomNumber sequencing
    }


    function fulfillCrime(bytes32 requestId) internal {
        // connect VRF results to rolls
        uint rollAttack = randomnessArray[requestId][0] % 101;
        uint rollReward = randomnessArray[requestId][1] % 100;
        address crimeInitiator = requestToAddress[requestId];
        uint missionSuccess = 0;
        uint totalLootCrime;
        uint chanceIndex;
        bool succesfulCrime = true;
        uint crime = crimeNumber[crimeInitiator]; // transfer over crime from crimeStart -> mapping -> fulfill
        if (attackXP[crimeInitiator]/1000000 > 100) {
            chanceIndex = 100;
        } else {
            chanceIndex = attackXP[crimeInitiator]/1000000;
        }

        if (crime == 1) {
            uint missionChance = pettyChance[chanceIndex];
            if (rollAttack < missionChance) {
                totalLootCrime = 10000000*rollReward/100 + 500000*(attackXP[crimeInitiator]/1000000)*rollReward/100;
                missionSuccess = 1;
            }
        } else if (crime == 2) {
            uint missionChance = villaChance[chanceIndex];
            if (rollAttack < missionChance) {
                totalLootCrime = 25000000*rollReward/100 + 250000*(attackXP[crimeInitiator]/1000000)*rollReward/100;
                missionSuccess = 1;
            }
        } else if (crime == 3) {
            uint missionChance = robberyChance[chanceIndex];
            if (rollAttack < missionChance) {
                totalLootCrime = 50000000*rollReward/100 + 400000*(attackXP[crimeInitiator]/1000000)*rollReward/100;
                missionSuccess = 1;
            }
        } else if (crime == 4) {
            uint missionChance = ransomChance[chanceIndex];
            if (rollAttack < missionChance) {
                totalLootCrime = 70000000*rollReward/100 + 500000*(attackXP[crimeInitiator]/1000000)*rollReward/100;
                missionSuccess = 1;
            }
        } else if (crime == 5) {
            uint missionChance = hijackChance[chanceIndex];
            if (rollAttack < missionChance) {
                totalLootCrime = 800000*(attackXP[crimeInitiator]/1000000 + defenseXP[crimeInitiator]/1000000)*rollReward/100;
                missionSuccess = 1;
            }
        }

        if (missionSuccess == 1 && memberOfFamilyIndex[crimeInitiator] != 0) {
            ingameBalances[crimeInitiator] += totalLootCrime*(100-familydatamapping[memberOfFamilyIndex[crimeInitiator]].familyMissionFee)/100;
            familyBank[memberOfFamilyIndex[crimeInitiator]] += totalLootCrime*familydatamapping[memberOfFamilyIndex[crimeInitiator]].familyMissionFee/100;
        } else {
            ingameBalances[crimeInitiator] += totalLootCrime; // = 0 when not succesful
        }

        if (missionSuccess == 0) {
            jailStamp[crimeInitiator] = block.timestamp + jailTime;
            succesfulCrime = false;
        }
        emit crimeResult(crimeInitiator, succesfulCrime, totalLootCrime, block.timestamp);
    }

    // ----------------------------------------------------------------------
    // ------------------- Family missions/functions  -----------------------
    // ----------------------------------------------------------------------
    function startFamily(bytes32 name, uint entreeFee, uint missionFee) external onlyActive {
        require((attackXP[msg.sender]/1000000 + defenseXP[msg.sender]/1000000) > 100, "Not experienced");
        require(ingameBalances[msg.sender] > 1000000000, "Fund");
        require(familyRank[msg.sender] < 80, "Already boss");
        require (entreeFee >= 0 && missionFee >= 0 && missionFee < 100, "Fees incorrect");
        // 1 = associate, 2 = soldier, 3 = caporegime, 4 = underboss, 5 = boss
        memberOfFamilyIndex[msg.sender] = familyIndex; // we need to track who is in what family, otherwise there is no way to get all necessary bonuses.
        familydatamapping[familyIndex].familyIndexNew = familyIndex;
        familydatamapping[familyIndex].familyName = name;
        familydatamapping[familyIndex].familyEntreeFee = entreeFee; // fee that new members have to pay to enter
        familydatamapping[familyIndex].familyMissionFee = missionFee;
        familydatamapping[familyIndex].familyOwner = msg.sender; // owner of the family
        familydatamapping[familyIndex].familyMembers.push(msg.sender); //remember: can only push one item at a time
        familyIndex += 1; // make new index
        familyRank[msg.sender] = 80;
        ingameBalances[msg.sender] -= 1000000000;
        emit familyStarted(name, msg.sender);
    }

    function getFamilyNames() external view returns (bytes32 [] memory) {
        bytes32[] memory familyNames = new bytes32[](familyIndex - 1);
        for (uint i=1; i < familyIndex; i++) {
            familyNames[i-1] = familydatamapping[i].familyName;
        }
        return familyNames;
    }

    function getFamilyFees(uint index) external view returns(uint [2] memory) {
        return [familydatamapping[index].familyEntreeFee, familydatamapping[index].familyMissionFee];
    }

    function getFamilyOwner(uint indexInput) external view returns (address) {
        return familydatamapping[indexInput].familyOwner;
    }

    function getFamilyRank(address _user) public view returns (uint) { // to check family bonuses (internal)
        return familyRank[_user];
    }

    function getFamilyBank(uint index) external view returns (uint) {
        return familyBank[index];
    }

    function getAllFamilyMembers(uint indexInput) external view returns (address [] memory) { // to check family bonuses (internal)
        return familydatamapping[indexInput].familyMembers;
    }

    function getMemberFamilyIndex(address _user) public view returns (uint) { // to check family bonuses (internal)
        return memberOfFamilyIndex[_user];
    }

    function getFamilyDefBonus(address _user) public view returns (uint) {
        return  getFamilyRank(_user) + familyDefBonus[getMemberFamilyIndex(_user)];
        }

    function getFamilyAttBonus(address _user) public view returns (uint) {
        uint memberofFamily = getMemberFamilyIndex(_user);
        return familyAttBonus[memberofFamily];
        }

    function joinOrUprankFamily(uint joinFamilyIndex) external onlyActive {
        require(joinFamilyIndex >= 1 && joinFamilyIndex < familyIndex, "Fa unknown");
        require(familyRank[msg.sender] != 80, "= Boss");
        if (memberOfFamilyIndex[msg.sender] != joinFamilyIndex) {
            // meaning this player is joining instead of upgrading
            require(getMemberFamilyIndex(msg.sender) == 0, "Leave current");
            require(ingameBalances[msg.sender] >= familydatamapping[joinFamilyIndex].familyEntreeFee, "Funding");
            ingameBalances[msg.sender] -= familydatamapping[joinFamilyIndex].familyEntreeFee; // pay the entree fee
            familyBank[joinFamilyIndex] += familydatamapping[joinFamilyIndex].familyEntreeFee; // transfer entree fee to family bank
            familydatamapping[joinFamilyIndex].familyMembers.push(msg.sender); //pushing this member to this family
            emit joinedFamily(msg.sender, joinFamilyIndex);

        }
        memberOfFamilyIndex[msg.sender] = joinFamilyIndex; // set this family as the player's new family
        if (attackXP[msg.sender]/1000000 + defenseXP[msg.sender]/1000000 > 199 && familyUnderbossClaimed[joinFamilyIndex] == 0) {
            familyRank[msg.sender] = 70;
            familyUnderbossClaimed[joinFamilyIndex] = 1;
        } else if (attackXP[msg.sender]/1000000 + defenseXP[msg.sender]/1000000 > 124) {
            familyRank[msg.sender] = 50;
        } else if (attackXP[msg.sender]/1000000 + defenseXP[msg.sender]/1000000 > 74) {
            familyRank[msg.sender] = 30;
        } else {
            familyRank[msg.sender] = 10;
        }
        emit newFamilyRank(familyRank[msg.sender]); // emits the family rank of player (10/30/50/70/80)
    }

    function leaveFamily(address user) external onlyActive {
        require(user == msg.sender || msg.sender == familydatamapping[getMemberFamilyIndex(user)].familyOwner, "kick yourself or kicked by boss");
        for (uint i=0; i < familydatamapping[getMemberFamilyIndex(user)].familyMembers.length; i++) {
            if (familydatamapping[getMemberFamilyIndex(user)].familyMembers[i] == user) {
                familydatamapping[getMemberFamilyIndex(user)].familyMembers[i] = familydatamapping[getMemberFamilyIndex(user)].familyMembers[familydatamapping[getMemberFamilyIndex(user)].familyMembers.length - 1];
            }
        }
        // remove family rights
        familydatamapping[getMemberFamilyIndex(user)].familyMembers.pop();
        memberOfFamilyIndex[user] = 0;
        familyRank[user] = 0;
    }

    function upgradeFamilyItems(uint category, uint item) external onlyActive {
        uint currentFamilyIndex = getMemberFamilyIndex(msg.sender);
        require(familydatamapping[currentFamilyIndex].familyOwner == msg.sender, "Not owner");

        if (category == 1) {
            require(familyBank[currentFamilyIndex] > famAttCosts[item-1], "Funding");
            require(familyAttBonus[currentFamilyIndex] == famAttBonuses[item-1], "Not sequential");
            familyBank[currentFamilyIndex] -= famAttCosts[item-1];
            familyAttBonus[getMemberFamilyIndex(msg.sender)] = famAttBonuses[item];
        } else if (category == 2) {
            require(familyBank[currentFamilyIndex] > famDefCosts[item-1], "Funding");
            require(familyDefBonus[currentFamilyIndex] == famDefBonuses[item-1], "Not sequential");
            familyBank[currentFamilyIndex] -= famDefCosts[item-1];
            familyDefBonus[getMemberFamilyIndex(msg.sender)] = famDefBonuses[item];
        }
        emit newFamilyItems(currentFamilyIndex, familyAttBonus[getMemberFamilyIndex(msg.sender)], familyDefBonus[getMemberFamilyIndex(msg.sender)]);
    }

    function removeFamily() external onlyActive {
        require(familydatamapping[getMemberFamilyIndex(msg.sender)].familyMembers.length <= 1, "Kick membs");
        require(familyRank[msg.sender] == 80, "Not boss");
        if (memberOfFamilyIndex[msg.sender] != familyIndex - 1) {
            familydatamapping[memberOfFamilyIndex[msg.sender]] = familydatamapping[familyIndex - 1]; // last index is inserted here, unless this is the last index, then just lower the indexer
        }
        familyIndex -= 1; // one less family in total
        memberOfFamilyIndex[msg.sender] = 0;
        familyRank[msg.sender] = 0;
    }

    function distributeFamilyBank(address _recipient, uint amount) external onlyActive {
        uint currentFamilyIndex = getMemberFamilyIndex(msg.sender);
        require(familyBank[currentFamilyIndex] > amount);
        require(familyRank[msg.sender] == 80, "Not boss");
        ingameBalances[_recipient] += amount;
        familyBank[memberOfFamilyIndex[msg.sender]] -= amount;
        emit fundsDistributed(currentFamilyIndex, amount);
    }

    function depositFamilyBank(uint amount) external onlyActive {
        uint currentFamilyIndex = getMemberFamilyIndex(msg.sender);
        require(ingameBalances[msg.sender] > amount);
        ingameBalances[msg.sender] -= amount;
        familyBank[memberOfFamilyIndex[msg.sender]] += amount;
        emit fundsDeposited(currentFamilyIndex, msg.sender, amount);

    }

    function organizedAttack() external onlyActive {
        uint currentFamilyIndex = getMemberFamilyIndex(msg.sender);
        require(orgAttackStamp[currentFamilyIndex] < block.timestamp - orgAttackTime, "Family is resting");

        require(familyIndex > 2, "no counterparty");
        require(familyRank[msg.sender] >= 50, "rank not high enough");
        require(orgAttackInitiated[msg.sender] < block.timestamp - safetyTime, "extra safety");
        orgAttackStamp[currentFamilyIndex] = block.timestamp;
        orgAttackInitiated[msg.sender] = block.timestamp;
        getRandomNumber(5); // fix getRandomNumber sequencing

    }

    function fulfillOrganizedAttack(bytes32 requestId) internal {
        address OrganizedInitiator = requestToAddress[requestId];
        uint familyRoll = randomnessArray[requestId][0] % (familyIndex-1)+1;
        if (familyRoll == memberOfFamilyIndex[OrganizedInitiator]) {
            if (familyRoll > 1) {
                familyRoll -= 1; // if own family is not index 0 or 1(!), safely reduce index by 1
            } else {
                familyRoll += 1; // if it is index 0, go to 1
            }
        }
        uint successRoll = randomnessArray[requestId][1] % 101;
        uint lootRoll = randomnessArray[requestId][2] % 51;

        // 2: sum up all the defense bonuses of defending party
        uint defendingFamily = 0;
        for (uint i=0; i < familydatamapping[familyRoll].familyMembers.length; i++) {
            defendingFamily += getFamilyDefBonus(familydatamapping[familyRoll].familyMembers[i]) + defenseXP[familydatamapping[familyRoll].familyMembers[i]]/1000000;
        }
        // 3: figure out the attack bonuses of attack family --> use familydatamapping[familyIndex].familyMembers
        uint attackingFamily = 0;
        for (uint i=0; i < familydatamapping[memberOfFamilyIndex[OrganizedInitiator]].familyMembers.length; i++) {
            attackingFamily += getFamilyAttBonus(familydatamapping[memberOfFamilyIndex[OrganizedInitiator]].familyMembers[i]) + attackXP[familydatamapping[memberOfFamilyIndex[OrganizedInitiator]].familyMembers[i]] /1000000;
        }
        // 5: roll (we use the attack brackets for individual attacks, that is, 50% higher att than def bonus means index 50, att < def means 20% chance)
        uint familyAttackChance;
        uint attackSuccess;
        if (attackingFamily > defendingFamily) {
            familyAttackChance = ((attackingFamily-defendingFamily)*100)/defendingFamily;
            attackSuccess = 0;
            if (familyAttackChance > 101) {
                attackSuccess = 1;
            } else { // note that <0 is filtered out by attackingFamily > defendingFamily a few lines above
                // use the indices
                if (successRoll < attChance[familyAttackChance]) { //
                    // attack succesful
                    attackSuccess = 1;
                }
            }
            // 6: figure out the rewards
            emit organizedAttackResult(memberOfFamilyIndex[OrganizedInitiator], 1, lootRoll*familyBank[familyRoll]/100); // first emit, or addition is included
            familyBank[memberOfFamilyIndex[OrganizedInitiator]] += lootRoll*familyBank[familyRoll]/100; // loot
            familyBank[familyRoll] -= lootRoll*familyBank[familyRoll]/100; // loot

        } else {
            emit organizedAttackResult(memberOfFamilyIndex[OrganizedInitiator], 0,0); // if att < def, att fails so 0, 0
        }
    }
}
    `;

    return (

        <PageWrapper>
            <PDFContainer>
                <SyntaxHighlighter showLineNumbers="true" language="solidity" style={dark} customStyle={{
                    backgroundColor: "transparent",
                    opacity: "1",
                    marginTop: "-2rem",
                    maxwidth: "50vw",
                }}  >
                    {codeString}
                </SyntaxHighlighter>
            </PDFContainer>
        </PageWrapper>
    )
}

export default Contract