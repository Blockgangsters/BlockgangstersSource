import React, { useState, useEffect } from 'react';
import {Nav, BetaLink, NavbarContainer, NavLogo, NavIcon, MobileIcon, NavMenu, NavLinks, NavItem, NavItemBtn, NavBtnLink, StatsItem, StatsContainer, MMConnect } from './Navbar.elements';
import { FaBars, FaTimes } from 'react-icons/fa';
import {IconContext} from 'react-icons/lib'
import {Button} from '../../globalStyles'
import NumberFormat from "react-number-format";
import {connectWallet}  from '../EthFunctions'

import {StateContext} from '../../App';



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
        <IconContext.Provider value={{color: '#fff'}}> 
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/" onClick={closeMobileMenu}>
                        <NavIcon src={require("../../images/logo_gang_101522.png").default} to="/" />

                        Blockgangsters.io

                    </NavLogo>

                    <MobileIcon onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </MobileIcon>
                    
                    <NavMenu onClick={handleClick} click={click}>
                    <NavItem>
                    <BetaLink to='/helppage'>

                                <h6 style={{color: "red"}}> Beta live on Polygon testnet! Click here for guide</h6>
                                </BetaLink>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/'>
                                Home
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/whitepaper'>
                                Whitepaper
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/contract'>
                                Contract
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/roadmap'>
                                Roadmap
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/tokenomics'>
                                Tokenomics
                            </NavLinks>
                        </NavItem>  
                            {adminConnected ?                         
                            <NavItem>
                                <NavLinks to='/admin'>
                                Admin page
                                </NavLinks>
                            </NavItem>  : null}
                        
 
                            {button && !mmConnected ? 
                                <NavItemBtn><NavBtnLink to="/sign-up"> 
                                <Button primary onClick={() => {
                                    const reaction = connectWallet();
                                    console.log(reaction.then((data) => {
                                        if (data.connectedStatus === false) {
                                            console.log(data.status)
                                        }
                                    }))
                                }}>Connect MetaMask</Button>
                        </NavBtnLink></NavItemBtn>  : [
                                        (!button && !mmConnected 
                                            ?
                                            <NavItemBtn><NavBtnLink to="/sign-up">
                                                <Button onClick={() => {
                                                    const reaction = connectWallet();
                                                    console.log(reaction.then((data) => {
                                                        if (data.connectedStatus === false) {
                                                            console.log(data.status)
                                                        }
                                                    }))
                                                }}>Connect MetaMask</Button>
                                                </NavBtnLink> </NavItemBtn>
                                            : null ) ]
                        }
                        {mmConnected && mainConnected === true ? (
                        <StatsContainer>
                            <StatsItem>
                                <NumberFormat
                                    value={inGameFunds}
                                    displayType={"text"}
                                    decimalSeparator={"."}
                                    thousandSeparator={true}
                                    decimalScale={4}
                                    prefix={"Wallet ₲ Balance: "}
                                    />
                            </StatsItem>          
                                
                            <StatsItem>
                                <NumberFormat 
                                    value={gangbalance}
                                    displayType={"text"}
                                    decimalSeparator={"."}
                                    thousandSeparator={true}
                                    decimalScale={4}
                                    prefix={"In-game ₲ Balance: "} />
                            </StatsItem>
                        </StatsContainer> ) : [ (mmConnected && mainConnected !== true && testConnected === true ? 
                                                <StatsContainer>
                                                <StatsItem>
                                                    <NumberFormat
                                                        value={inGameFunds}
                                                        displayType={"text"}
                                                        decimalSeparator={"."}
                                                        thousandSeparator={true}
                                                        decimalScale={4}
                                                        prefix={"Wallet ₲ Balance: "}
                                                        />
                                                </StatsItem>          
                                                    
                                                <StatsItem>
                                                    <NumberFormat 
                                                        value={gangbalance}
                                                        displayType={"text"}
                                                        decimalSeparator={"."}
                                                        thousandSeparator={true}
                                                        decimalScale={0}
                                                        prefix={"In-game ₲ Balance: "} />
                                                </StatsItem>
                                                <MMConnect>Testnet connected</MMConnect>
                                            </StatsContainer>  : (mmConnected ? <MMConnect>Unsupported chain</MMConnect> : null))]
                        }
                    </NavMenu>
                </NavbarContainer>
            </Nav>
        </IconContext.Provider>
    )
}

export default Navbar
