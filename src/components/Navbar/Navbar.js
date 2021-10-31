import React, { useState, useEffect } from 'react';
import { Nav, BetaLink, NavbarContainer, NavLogo, NavIcon, MobileIcon, NavMenu, NavLinks, NavItem, NavItemBtn, NavBtnLink, StatsItem, StatsContainer, MMConnect } from './Navbar.elements';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib'
import { Button } from '../../globalStyles'
import NumberFormat from "react-number-format";
import { connectWallet } from '../EthFunctions'

import { StateContext } from '../../App';



const Navbar = () => {

    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true);
    const [, gangbalance, mmConnected, mainConnected, testConnected, adminConnected, inGameFunds] = React.useContext(StateContext);
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    useEffect(() => {
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/" onClick={closeMobileMenu}>
                        <NavIcon src="images/logo_gang_101522.png" />
                        Blockgangsters.io
                    </NavLogo>

                    <MobileIcon onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </MobileIcon>

                    <NavMenu onClick={handleClick} click={click}>
                        <NavItem key="helppage">
                            <BetaLink to='/helppage'>

                                <h6 style={{ color: "red" }}> Beta live on Polygon testnet! Click here for guide</h6>
                            </BetaLink>
                        </NavItem>
                        <NavItem key="homepage">
                            <NavLinks to='/'>
                                Home
                            </NavLinks>
                        </NavItem>
                        <NavItem key="whitepaper">
                            <NavLinks to='/whitepaper'>
                                Whitepaper
                            </NavLinks>
                        </NavItem>
                        <NavItem key="contract">
                            <NavLinks to='/contract'>
                                Contract
                            </NavLinks>
                        </NavItem>
                        <NavItem key="roadmap">
                            <NavLinks to='/roadmap'>
                                Roadmap
                            </NavLinks>
                        </NavItem>
                        <NavItem key="tokenomics">
                            <NavLinks to='/tokenomics'>
                                Tokenomics
                            </NavLinks>
                        </NavItem>
                        {adminConnected ?
                            <NavItem key="admin">
                                <NavLinks to='/admin'>
                                    Admin page
                                </NavLinks>
                            </NavItem> : null}


                        {button && !mmConnected ?
                            <NavItemBtn key="signup"><NavBtnLink to="/sign-up">
                                <Button primary onClick={() => {
                                    const reaction = connectWallet();
                                    console.log(reaction.then((data) => {
                                        if (data.connectedStatus === false) {
                                            console.log(data.status)
                                        }
                                    }))
                                }}>Connect MetaMask</Button>
                            </NavBtnLink></NavItemBtn> :
                            (!button && !mmConnected
                                ?
                                <NavItemBtn key="signupmobile"><NavBtnLink to="/sign-up">
                                    <Button onClick={() => {
                                        const reaction = connectWallet();
                                        console.log(reaction.then((data) => {
                                            if (data.connectedStatus === false) {
                                                console.log(data.status)
                                            }
                                        }))
                                    }}>Connect MetaMask</Button>
                                </NavBtnLink> </NavItemBtn>
                                : null)
                        }
                        {mmConnected && mainConnected === true ? (
                            <StatsContainer key="statscontainerMain">
                                <StatsItem key="gangmainBalance">
                                    <NumberFormat
                                        value={gangbalance}
                                        displayType={"text"}
                                        decimalSeparator={"."}
                                        thousandSeparator={true}
                                        decimalScale={0}
                                        prefix={"Wallet ₲ Balance: "}
                                    />
                                </StatsItem>

                                <StatsItem key="inGamemainFunds">
                                    <NumberFormat
                                        value={inGameFunds}
                                        displayType={"text"}
                                        decimalSeparator={"."}
                                        thousandSeparator={true}
                                        decimalScale={0}
                                        prefix={"In-game ₲ Balance: "} />
                                </StatsItem>
                            </StatsContainer>) : [(mmConnected && mainConnected !== true && testConnected === true ?
                                <StatsContainer key="statscontainerTest">
                                    <StatsItem key="gangtestbalance">
                                        <NumberFormat
                                            value={gangbalance}
                                            displayType={"text"}
                                            decimalSeparator={"."}
                                            thousandSeparator={true}
                                            decimalScale={0}
                                            prefix={"Wallet ₲ Balance: "}
                                        />
                                    </StatsItem>

                                    <StatsItem key="inGametestFunds">
                                        <NumberFormat
                                            value={inGameFunds}
                                            displayType={"text"}
                                            decimalSeparator={"."}
                                            thousandSeparator={true}
                                            decimalScale={0}
                                            prefix={"In-game ₲ Balance: "} />
                                    </StatsItem>
                                    <MMConnect key="TestNetMMConnect">Testnet connected</MMConnect>
                                </StatsContainer> : (mmConnected ? <MMConnect key="UnsupportedChain">Unsupported chain</MMConnect> : null))]
                        }
                    </NavMenu>
                </NavbarContainer>
            </Nav>
        </IconContext.Provider>
    )
}

export default Navbar
