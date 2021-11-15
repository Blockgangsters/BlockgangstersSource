import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Gamebar from './components/Gamebar/Gamebar'
import Home from './pages/HomePage/Home';
import Helppage from './pages/Helppage/Helppage';
import Whitepaper from './pages/Whitepaper/Whitepaper';
import Contract from './pages/Contract/Contract';
import Roadmap from './pages/Roadmap/Roadmap';
import Tokenomics from './pages/Tokenomics/Tokenomics'
import Admin from './pages/Admin/Admin'
import ScrollToTop from './components/ScrollToTop';
import Deposit from './pages/Deposit/Deposit';
import IndProtection from './pages/IndProtection/IndProtection';
import Attackplayer from './pages/Attackplayer/Attackplayer';
import Crime from './pages/Crime/Crime';
import Crowdfunding from './pages/Crowdfunding/Crowdfunding';
import Trainstats from './pages/Trainstats/Trainstats';
import Familycontrol from './pages/Familycontrol/Familycontrol';
import Familyshop from './pages/Familyshop/Familyshop';
import Attackfamily from './pages/Attackfamily/Attackfamily';
import Overview from './pages/Overview/Overview';
import Highestlevels from './pages/Highestlevels/Highestlevels';
import Richestplayers from './pages/Richestplayers/Richestplayers';
import Statistics from './pages/Statistics/Statistics';
import { getCrimeStatus, getAttackStatus, tokenAddress, getERCBalance, EthBalance, getingameFunds, getJailStatus, getAttackXP, getDefenseXP, getCrowdfundStatus } from './components/EthFunctions';
import tokenABI from './components/EthABI'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider';
import styled from '@emotion/styled/macro';
import NumberFormat from "react-number-format";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Sidebar } from './features/app-container/ui/sidebar/Sidebar';
import "./styles/globals/globals.css"
import { Button } from './features/shared/ui/buttons/Button';

export const StateContext = React.createContext();
export const EthContext = React.createContext();

const StyledPopup = styled(Popup)`

	justify-content: center;
	align-items: center;
	display: flex;

	&-overlay {
		opacity: 1;
	}
	// use your custom style for ".popup-content"
	&-content {
		background: #808097;
		width: 200px;
		border: #505064;
		border-radius: 15px;
		border-width: 5px;
		justify-content: center;
		align-items: center;
		display: flex;
	}
`


function App() {
    const [mmConnected, setmmConnected] = useState(false);
    const [mainConnected, setmainConnected] = useState(false);
    const [testConnected, settestConnected] = useState(false)
    const [chainConnected, setchainConnected] = useState(0);
    const [adminConnected, setadminConnected] = useState(false);
    const [finishedFlag, setFinishedFlag] = useState(0);
    const [balance, setBalance] = useState(0);
    const [gangbalance, setgangBalance] = useState(0);
    const [bootstrapUsed, setBootstrapUsed] = useState(0);
    const [protectionHours, setProtectionHours] = useState(0);

    const fetchBalance = async (address) => {
        const newETHBalance = await EthBalance(address)
        const newBalanceWei = ethers.utils.formatEther(newETHBalance)
        if (window.ethereum.chainId === "0x89") {
            const newGANGBalance = await getERCBalance(address);
            setgangBalance(newGANGBalance);
        } else {
            setgangBalance(0);
        }
        setBalance(newBalanceWei);
    }

    useEffect(() => {
        if (window.ethereum) {

            window.ethereum.on('chainChanged', (chainId) => {
                setchainConnected(chainId);
                window.location.reload();
            });
        }
    }, [chainConnected]);

    useEffect(() => {
        const fetchBootstrap = async () => {
            if (mmConnected) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
                let providerBlock = await provider.getBlockNumber();

                let bootstrapFilter = gangContract.filters.bootstrapBought(null, null, null)
                let events = await gangContract.queryFilter(bootstrapFilter, providerBlock - 70000, providerBlock)
                let eventsReversed = events.reverse();
                if (events.length !== 0) {
                    setBootstrapUsed(eventsReversed[0].args[2]);
                }
            }
        }

        fetchBootstrap();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    useEffect(() => {
        const fetchProtection = async () => {
            if (mmConnected) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
                let providerBlock = await provider.getBlockNumber();

                let protectionFilter = gangContract.filters.boughtProtection(ethers.utils.getAddress(window.ethereum.selectedAddress), null, null)
                let events = await gangContract.queryFilter(protectionFilter, providerBlock - 70000, providerBlock)
                let eventsReversed = events.reverse();
                if (events.length !== 0) {
                    let now = Date.now() / 1000;
                    let delta = eventsReversed[0].args[2].toNumber() + 3600 * 24 * eventsReversed[0].args[1].toNumber() - now;
                    let hoursLeft = Math.floor(delta / 3600);
                    console.log("hours left: ", hoursLeft)
                    setProtectionHours(hoursLeft)
                }

            }
        }

        fetchProtection();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    useEffect(() => {
        if (window.ethereum) {
            console.log("in this effect now")
            const fetchConnected = async () => {
                const provider = await detectEthereumProvider();
                const result = await provider.request({ method: "eth_accounts", params: [] });
                console.log("connected account: ", result[0])
                setchainConnected(window.ethereum.chainId)

                if (result[0] === "0x212057855f52669966a472dc48b543deefe32a38") {
                    setadminConnected(true)
                }
                if (result.length !== 0) {
                    setConnectedAccount(result[0]);
                    console.log("Set connected to true")
                    setmmConnected(true);
                    fetchBalance(result[0]);
                    if (window.ethereum.chainId === "0x89") {
                        setmainConnected(true);
                        settestConnected(false);
                    } else if (window.ethereum.chainId === "0x13881") {
                        setmainConnected(false);
                        settestConnected(true);
                    } else {
                        setmainConnected(false);
                        settestConnected(false);
                    }
                } else {
                    setmmConnected(false);
                    setBalance(0);
                    setgangBalance(0);
                }
                if (window.ethereum.chainId !== undefined && result.length !== 0) {
                    setFinishedFlag(1);
                }
            }
            fetchConnected(); // run fetchConnected when [] changes (i.e. main/test/chainConnected).
        }
    }, [chainConnected]);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => { // listener will automatically pick up changes to accounts. We can set all switches here.
                console.log("Accounts changed triggered, new acc: ", accounts[0])
                if (accounts[0] === "0xa338c42cd68dd24931f270836cdbddcea4132770") {
                    setadminConnected(true)
                } else if (accounts[0] !== undefined) {
                    setadminConnected(false)
                    setmmConnected(true)
                } else {
                    setmmConnected(false)
                }
                window.location.reload();

                // check if admin acc, otherwise remove this hook
            });
        }
    }, [chainConnected]);

    // ------------------ ethcontext ---------------------
    const [attorneyState, setAttorneyState] = useState(false);
    const [jailState, setJailState] = useState(0);
    const [defenseState, setDefenseState] = useState(0);
    const [attackState, setAttackState] = useState(0);
    const [inGameFunds, setInGameFunds] = useState(0);
    const [jailSeconds, setJailSeconds] = useState(0);
    const [attorneySeconds, setAttorneySeconds] = useState(0);
    const [attackSeconds, setAttackSeconds] = useState(0);
    const [crimeSeconds, setCrimeSeconds] = useState(0);
    const [trainSeconds, setTrainSeconds] = useState(0);
    const [crowdfundSeconds, setCrowdfundSeconds] = useState(0);
    const [crowdfundClaimable, setCrowdfundClaimable] = useState(0);
    // to manage pop ups!
    const [crimePopup, setCrimePopup] = useState(0);
    const [attackPopup, setAttackPopup] = useState(0);
    const [attorneyPopup, setAttorneyPopup] = useState(0);
    const [crowdfundPopup, setCrowdfundPopup] = useState(0);
    const [lastCrowdfundLoot, setLastCrowdfundLoot] = useState(0);

    const [lastCrimeLoot, setLastCrimeLoot] = useState(0);
    const [lastAttackLoot, setLastAttackLoot] = useState(0);
    const [lastAttackResult, setLastAttackResult] = useState(0);
    const [lastAttorneyResult, setLastAttorneyResult] = useState(0);
    const [lastAttorneyFee, setLastAttorneyFee] = useState(0);
    const [connectedAccount, setConnectedAccount] = useState();
    // --------------------- get all values initially ------------
    useEffect(() => {
        if (chainConnected === "0x89" && mmConnected) {
            getingameFunds(connectedAccount).then((data) => {
                setInGameFunds(data.toNumber());
            });

            getJailStatus().then((data) => {
                setJailState(data[0].toNumber())
                setAttorneyState(data[1].toNumber())
                setJailSeconds(data[2].toNumber())
                setAttorneySeconds(data[3].toNumber())
            });

            getAttackStatus().then((data, reject) => {
                if (data.toNumber() !== undefined) {
                    setAttackSeconds(Math.max(100 + data.toNumber() - Math.floor(+new Date().getTime() / 1000), 0));
                } else {
                    setAttackSeconds(0); // first time using attack
                }
                if (reject != null) {
                    console.log(reject)
                }
            });

            getCrimeStatus().then((data, reject) => {
                if (data.toNumber() !== undefined) {
                    setCrimeSeconds(Math.max(300 + data.toNumber() - Math.floor(+new Date().getTime() / 1000), 0));
                } else {
                    setCrimeSeconds(0); // first time using attack
                }
                if (reject != null) {
                    console.log(reject)
                }
            });

            getCrowdfundStatus().then((data, reject) => {
                if (data[1].toNumber() !== 0) {
                    setCrowdfundSeconds(Math.max(600 + data[1].toNumber() - Math.floor(+new Date().getTime() / 1000), 0));
                } else if (data[0].toNumber() === 1 && data[1].toNumber() === 0) {
                    setCrowdfundSeconds(0); // finished & unclaimed
                    setCrowdfundClaimable(1);
                }
                if (reject != null) {
                    console.log(reject)
                }
            });

            getDefenseXP().then((data) => {
                setDefenseState(data.toNumber());
            });

            getAttackXP().then((data) => {
                setAttackState(data.toNumber());
            });
        }
    }, [finishedFlag, chainConnected, mmConnected, connectedAccount]); // load these stats once on page load. Hereafter listen to events. 



    // ------------------ ethcontext ---------------------


    useEffect(() => {
        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            gangContract.on("trainedStats", (choice, address, newXP) => {
                console.log("trainedstats, address: ", address)
                console.log("compared to: ", ethers.utils.getAddress(window.ethereum.selectedAddress))
                if (address === ethers.utils.getAddress(window.ethereum.selectedAddress)) {
                    console.log("Got the event");
                    if (choice.toNumber() === 1) {
                        console.log("Trained attack")
                        handleAttackXP(newXP)
                    } else if (choice.toNumber() === 2) {
                        console.log("Trained defense")
                        handleDefenseXP(newXP)
                    } else {
                        console.log("Invalid choice")
                    }
                    handleTrained(choice, address, newXP);
                }
            })
        }
    }, [chainConnected]); // inside useEffect to apply listener only once. Test if this works.

    useEffect(() => {
        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            gangContract.on("attorneyHired", (success, player, amount) => {
                if (player === ethers.utils.getAddress(window.ethereum.selectedAddress)) {
                    handleAttorneyHired(success.toString(), player, amount);
                }
                // if success 1 --> second index is payment. if success 2 --> second index is bonus fee
            })
        }
    }, [chainConnected]);

    useEffect(() => {
        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            gangContract.on("Transfer", (from, to, amount) => {
                console.log("Got the event");
                console.log(from);
                console.log(to);
                console.log(amount.toString());
            })
        }
    }, [chainConnected]);

    useEffect(() => {
        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            gangContract.on("playerJailed", (address, jailStamp) => {
                if (address === ethers.utils.getAddress(window.ethereum.selectedAddress)) {
                    console.log("Got the jailed event");
                    console.log(address);
                    getJailStatus().then((data) => {
                        console.log("JailStatus is: ", data[0].toNumber());
                        console.log("AttorneyStatus is: ", data[1].toNumber());
                        setJailState(data[0].toNumber())
                        setAttorneyState(data[1].toNumber())
                        setJailSeconds(data[2].toNumber())
                        setAttorneySeconds(data[3].toNumber())
                    });
                }
            })
        }
    }, [chainConnected]);

    useEffect(() => {
        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            gangContract.on("playerAttacked", (successAttack, attacker, defender, loot, attackStamp) => {
                if (attacker === ethers.utils.getAddress(window.ethereum.selectedAddress)) {
                    handlePlayerAttacked(successAttack, loot, attackStamp);
                }
            })
        }
    }, [chainConnected]);


    useEffect(() => {
        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            gangContract.on("crimeResult", (initiator, succesfulCrime, totalLootCrime, crimeStamp) => {
                console.log("Crime Initiator is: ", initiator)
                console.log(typeof initiator)
                console.log(typeof window.ethereum.selectedAddress)
                if (initiator === ethers.utils.getAddress(window.ethereum.selectedAddress)) {
                    console.log("Succesfully handled")
                    handleCrime(succesfulCrime, totalLootCrime.toNumber(), crimeStamp);
                }
            }) //first index 0 = success, first index 1 = success, second index = loot
        }
    }, [chainConnected]);

    useEffect(() => {
        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            gangContract.on("crowdFundGains", (initiator, reward) => {
                console.log("Crowdfundgains initiator: ", initiator)
                console.log(typeof initiator)
                if (initiator === ethers.utils.getAddress(window.ethereum.selectedAddress)) {
                    console.log("Crowdfund is nicely detected")
                    handleCrowdfund(initiator, reward.toNumber());
                }
            }) //first index 0 = success, first index 1 = success, second index = loot
        }
    }, [chainConnected]);



    const handleAttackXP = (newXP) => {
        if (newXP > 100000000) {
            setAttackState(100000000);
        } else {
            setAttackState(newXP.toString())
        }
    }
    const handleDefenseXP = (newXP) => {
        if (newXP > 100000000) {
            setDefenseState(100000000);
        } else {
            setDefenseState(newXP.toString())
        }
    }

    const handleAttorneyHired = (success, player, fee) => {
        setAttorneyState(0)
        setLastAttorneyResult(success); // to help popup
        setLastAttorneyFee(fee.toNumber());
        console.log("Got attorney event");
        console.log("success: ", success);
        // if success 1 --> second index is payment. if success 2 --> second index is bonus fee
        if (success === "1") {
            console.log("Attorney succesful but need to pay: ", fee);
        } else if (success === "2") {
            console.log("Succesful and get compensation: ", fee);
        } else if (success === "0") {
            console.log("Attorney unsuccesful, you stay in jail");
        }
        getingameFunds().then((data) => {
            console.log("result is: ", data.toNumber());
            setInGameFunds(data.toNumber());
        });

        getJailStatus().then((data) => {
            console.log("JailStatus is: ", data[0].toNumber());
            console.log("AttorneyStatus is: ", data[1].toNumber());
            setJailState(data[0].toNumber())
            setAttorneyState(data[1].toNumber())
            setJailSeconds(data[2].toNumber())
            setAttorneySeconds(data[3].toNumber())
        });

        setAttorneyPopup(true);
    }

    useEffect(() => {
        if (attorneySeconds > 0) {
            const timer = setTimeout(() => setAttorneySeconds(attorneySeconds - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setAttorneyState(1);
        }

    }, [attorneySeconds]);

    useEffect(() => {
        if (jailSeconds > 0) {
            const timer = setTimeout(() => setJailSeconds(jailSeconds - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setJailState(1);
        }
    }, [jailSeconds]);

    useEffect(() => {
        if (attackSeconds > 0) {
            const timer = setTimeout(() => setAttackSeconds(attackSeconds - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setAttackSeconds(0);
        }
    }, [attackSeconds]);

    useEffect(() => {
        if (crimeSeconds > 0) {
            const timer = setTimeout(() => setCrimeSeconds(crimeSeconds - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCrimeSeconds(0);
        }
    }, [crimeSeconds]);

    useEffect(() => {
        if (trainSeconds > 0) {
            const timer = setTimeout(() => setTrainSeconds(trainSeconds - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setTrainSeconds(0);
        }
    }, [trainSeconds]);


    useEffect(() => {
        if (crowdfundSeconds > 0) {
            const timer = setTimeout(() => setCrowdfundSeconds(crowdfundSeconds - 1), 1000);
            return () => clearTimeout(timer);
        } else if (crowdfundSeconds === 1) {
            setCrowdfundClaimable(1); // its only 1 once, little bit of a cheat but works (0 fails on page reload)
        } else {
            setCrowdfundSeconds(0);
        }
    }, [crowdfundSeconds]);



    const handleCrime = (success, loot, crimeStamp) => {
        console.log("Got crime event");
        console.log("success: ", success);
        setCrimeSeconds(7200 + crimeStamp.toNumber() - Math.floor(+new Date().getTime() / 1000));
        console.log("Set crime seconds by event: ", 7200 + crimeStamp.toNumber() - Math.floor(+new Date().getTime() / 1000))
        // if success 1 --> second index is payment. if success 2 --> second index is bonus fee
        if (success === true) {
            console.log("Crime succesful, loot: ", loot);
            setLastCrimeLoot(loot); // pop up needs to know what to show
            setCrimePopup(true); // trigger a popup 
        } else if (success === false) {
            console.log("Crime unsuccesful, you're jailed");
            getJailStatus().then((data) => {
                console.log("JailStatus is: ", data[0].toNumber());
                console.log("AttorneyStatus is: ", data[1].toNumber());
                setJailState(data[0].toNumber())
                setAttorneyState(data[1].toNumber())
                setJailSeconds(data[2].toNumber())
                setAttorneySeconds(data[3].toNumber())
                setCrimePopup(true); // trigger a popup 
            });
        }
        getingameFunds().then((data) => {
            console.log("result is: ", data.toNumber());
            setInGameFunds(data.toNumber());
        });

    }

    const handleCrowdfund = (initiator, loot) => {
        console.log("Got crime event");
        if (loot !== 0) {
            console.log("Crowdfund loot: ", loot);
            setLastCrowdfundLoot(loot); // pop up needs to know what to show
            setCrowdfundPopup(true); // trigger a popup 
        } else {
            console.log("Crowdfunding failed, you lost your investment");
            setCrowdfundPopup(true); // trigger a popup 
        }
    }

    const handlePlayerAttacked = (success, loot, attackStamp) => {
        console.log("HandlePlayerattacked success value: ", success)
        setAttackSeconds(7200 + attackStamp.toNumber() - Math.floor(+new Date().getTime() / 1000));
        console.log("Set attack seconds by event: ", 7200 + attackStamp.toNumber() - Math.floor(+new Date().getTime() / 1000))
        if (success === true) {
            console.log("Total loot: ", loot.toNumber());
            setLastAttackResult(true);
            setLastAttackLoot(loot.toNumber())
        } else if (success === false) {
            console.log("Attack failed, total payment: ", loot.toNumber());
            setJailState(0)
            setLastAttackResult(false);
            setLastAttackLoot(loot.toNumber())
        }
        getingameFunds().then((data) => {
            console.log("result is: ", data.toNumber());
            setInGameFunds(data.toNumber());
        });
        setAttackPopup(true)
    }

    // no timestamp necessary since transaction goes through directly, just do + 300 sec 
    const handleTrained = (choice, address, newXP) => {
        setTrainSeconds(86400);
    }

    return (
        <StateContext.Provider value={[balance, gangbalance, mmConnected, mainConnected, testConnected, adminConnected, inGameFunds]}>
            <EthContext.Provider value={[defenseState, setDefenseState, attackState, setAttackState, jailState, setJailState, attorneyState, setAttorneyState, inGameFunds, setInGameFunds, jailSeconds, attorneySeconds, attackSeconds, crimeSeconds, trainSeconds, crowdfundSeconds, crowdfundClaimable, setCrowdfundSeconds, bootstrapUsed, protectionHours]}>

                <Router basename='/'>

                    <ScrollToTop />
                    <StyledPopup open={crimePopup} position="center center" modal closeOnDocumentClick>
                        {() => (
                            <>

                                {lastCrimeLoot !== 0 ? <div>Crime Successful, loot: {<NumberFormat
                                    value={lastCrimeLoot}
                                    displayType={"text"}
                                    decimalSeparator={"."}
                                    thousandSeparator={true}
                                    decimalScale={0} />}</div> : <div>Crime failed :(</div>}
                                <Button onClick={() => setCrimePopup(false)}>
                                    close
                                </Button>
                            </>
                        )}
                    </StyledPopup>
                    <StyledPopup open={attackPopup} position="center center" modal closeOnDocumentClick>
                        {() => (
                            <>

                                {lastAttackResult === true ? <div>Attack Successful, loot: {<NumberFormat
                                    value={lastAttackLoot}
                                    displayType={"text"}
                                    decimalSeparator={"."}
                                    thousandSeparator={true}
                                    decimalScale={0} />}</div> : <div>Attack failed, cost: {<NumberFormat
                                        value={lastAttackLoot}
                                        displayType={"text"}
                                        decimalSeparator={"."}
                                        thousandSeparator={true}
                                        decimalScale={0} />}</div>}
                                <Button onClick={() => setAttackPopup(false)}>
                                    close
                                </Button>
                            </>
                        )}
                    </StyledPopup>

                    <StyledPopup open={attorneyPopup} position="center center" modal closeOnDocumentClick>
                        {() => (
                            <>

                                {lastAttorneyResult === "1" ? <div>Attorney Successful, it cost you: {<NumberFormat
                                    value={lastAttorneyFee}
                                    displayType={"text"}
                                    decimalSeparator={"."}
                                    thousandSeparator={true}
                                    decimalScale={0} />}</div> : (lastAttorneyResult === "2" ? <div>Attorney Successful, compensation: {<NumberFormat
                                        value={lastAttorneyFee}
                                        displayType={"text"}
                                        decimalSeparator={"."}
                                        thousandSeparator={true}
                                        decimalScale={0} />}</div> : <div>Attorney unsuccessful, it cost you nothing.</div>)}
                                <Button onClick={() => setAttorneyPopup(false)}>
                                    close
                                </Button>
                            </>
                        )}
                    </StyledPopup>

                    <StyledPopup open={crowdfundPopup} position="center center" modal closeOnDocumentClick>
                        {() => (
                            <>

                                {lastCrowdfundLoot !== 0 ? <div>Crowdfunding succesful, loot: {<NumberFormat
                                    value={lastCrowdfundLoot}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    decimalScale={0} />}</div> : <div>Crowdfunding failed :(</div>}
                                <Button onClick={() => setCrowdfundPopup(false)}>
                                    close
                                </Button>
                            </>
                        )}
                    </StyledPopup>

                    <Navbar />

                    <Sidebar>
                        <Gamebar />
                    </Sidebar>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/helppage" exact component={Helppage} />
                        <Route path="/roadmap" exact component={Roadmap} />
                        <Route path="/contract" exact component={Contract} />
                        <Route path="/whitepaper" exact component={Whitepaper} />
                        <Route path="/tokenomics" exact component={Tokenomics} />
                        <Route path="/admin" exact component={Admin} />
                        <Route path="/deposit" exact component={Deposit} />
                        <Route path="/indprotection" exact component={IndProtection} />
                        <Route path="/attackplayer" exact component={Attackplayer} />
                        <Route path="/crime" exact component={Crime} />
                        <Route path="/crowdfunding" exact component={Crowdfunding} />
                        <Route path="/trainstats" exact component={Trainstats} />
                        <Route path="/familycontrol" exact component={Familycontrol} />
                        <Route path="/attackfamily" exact component={Attackfamily} />
                        <Route path="/overview" exact component={Overview} />
                        <Route path="/familyshop" exact component={Familyshop} />
                        <Route path="/statistics" exact component={Statistics} />
                        <Route path="/highestlevels" exact component={Highestlevels} />
                        <Route path="/richestplayers" exact component={Richestplayers} />
                    </Switch>
                    <Footer />
                </Router>
            </EthContext.Provider>
        </StateContext.Provider>
    );
}

export default App;