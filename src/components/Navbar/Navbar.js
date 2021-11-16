import React, { useState } from 'react';

import styled from '@emotion/styled/macro';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GiThompsonM1 } from "react-icons/gi";
import { Link } from 'react-router-dom';

import { StateContext } from '../../App';
import { ZIndex } from '../../styles/globals/ZIndex';
import { Colors } from '../../styles/theme/colors/Colors';
import { breakpoint } from '../../styles/theme/responsive/breakpoint';

import { CoinStats } from './coinstats/CoinStats';


const Navbar = () => {

    const [click, setClick] = useState(false)
    const [gameClick, setGameClick] = useState(false)
    const [, , , , , adminConnected,] = React.useContext(StateContext);
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)
    const handleGameClick = () => setGameClick(!gameClick)
    const closeGameMenu = () => setGameClick(false)
    const handleBoth = () => { closeMobileMenu(); closeGameMenu() };

    return (
        <StyledNavbar>
            <NavbarContainer>
                <StyledMenuButton onClick={handleGameClick}>
                    {gameClick
                        ? <FaTimes size={36} color='white' />
                        : <GiThompsonM1 size={36} color='white' />}
                </StyledMenuButton>
                <StyledLogoLink to="/" onClick={handleBoth}>
                    <StyledLogo src="images/logo_gang_101522.png" />
                    Blockgangsters
                </StyledLogoLink>


                <NavMenu onClick={handleClick} click={click}>
                    <StyledNavLink to="/">Home</StyledNavLink>
                    <StyledNavLink to="/helppage">Guide</StyledNavLink>
                    <StyledNavLink to="/whitepaper">Whitepaper</StyledNavLink>
                    <StyledNavLink to="/contract">Contract</StyledNavLink>
                    <StyledNavLink to="/roadmap">Roadmap</StyledNavLink>
                    <StyledNavLink to="/tokenomics">Tokenomics</StyledNavLink>
                    {adminConnected && <StyledNavLink to="/admin">Admin page</StyledNavLink>}
                    <CoinStats />

                </NavMenu>

                <GameMobileMenu onClick={handleGameClick} gameClick={gameClick}>
                    <StyledGameNavigation>
                        <StyledTitle> Control Panel</StyledTitle>
                        <StyledLink to='/deposit'>Deposit/Withdraw</StyledLink>
                        <StyledSubtitle> Lone wolf </StyledSubtitle>
                        <StyledLink to='/indprotection'>Buy protection</StyledLink>
                        <StyledLink to='/attackplayer'>Attack a player</StyledLink>
                        <StyledLink to='/crime'>Crime in the city</StyledLink>
                        <StyledLink to='/crowdfunding'>Crowdfunding</StyledLink>
                        <StyledLink to='/trainstats'>Train stats</StyledLink>
                        <StyledSubtitle> Family </StyledSubtitle>
                        <StyledLink to='/familycontrol'>Family control page</StyledLink>
                        <StyledLink to='/familyshop'>Family shop</StyledLink>
                        <StyledLink to='/attackfamily'>Family attack</StyledLink>
                        <StyledLink to='/overview'>Family list</StyledLink>
                        <StyledSubtitle> Leaderboards </StyledSubtitle>
                        <StyledLink to='/richestplayers'>Richest players</StyledLink>
                        <StyledLink to='/highestlevels'>Highest levels</StyledLink>
                        <StyledLink to='/statistics'>Statistics</StyledLink>
                    </StyledGameNavigation>
                </GameMobileMenu>

                <StyledMenuButton onClick={handleClick}>
                    {click
                        ? <FaTimes size={36} color='white' />
                        : <FaBars size={36} color='white' />}
                </StyledMenuButton>
            </NavbarContainer>
        </StyledNavbar >
    )
}

export default Navbar;


const StyledNavbar = styled.nav`
            display: flex;
            justify-content: space-between;
            height: 80px;
            width: 100%;
            background: #101522;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            position: sticky;
            top: 0;
            z-index: ${ZIndex.Navbar};
            border-bottom: 1px solid ${Colors.Border};
            `

const StyledNavLink = styled(Link)`
            color: ${Colors.White};
            text-decoration: none;
            text-align: center;
            margin-left: 10px;
            ${breakpoint.l} {
                padding: 0 10px;
            line-height: 80px;
            text-align: left;

    }
            `

export const Nav = styled.nav`
            display: flex;
            justify-content: center;
            align-items: center;
            background: #101522;
            height: 80px;
            width: 100vw;
            position: sticky;
            `

export const NavbarContainer = styled.div`
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 80px;
            padding-right: 30px;
            padding-left: 30px;
            ${breakpoint.l} {

            }
            `

export const StyledLogoLink = styled(Link)`
            font-family: 'The Godfather';
            color: #fff;
            cursor: pointer;
            text-decoration: none;
            font-size: 30px;
            display: flex;
            align-items: center;
            text-align: center;
            ${breakpoint.l} {
                font-size: 65px;
    }
`

export const StyledLogo = styled.img`
            display: none;
    ${breakpoint.l} {
        padding-right: 5px;
        max-height: 80%;
        max-width: 80%;
        display: flex;
    }
`

export const StyledMenuButton = styled.div`
            cursor: pointer;
            z-index: ${ZIndex.NavIcon};
            display: flex;
            align-self: center; // vertically
            ${breakpoint.l} {
                display: none; // set to none when finished (7 nov 21)
    }
  `

export const NavMenu = styled.div`
            display: flex;
            flex-direction: column;
            position: absolute;
            left: 0;
            top: 0;
            margin-top: 80px;
            width: 100vw;
            height: 100vh;
            display: ${({ click }) => (!click && 'none')};
            background: #101522;


            ${breakpoint.l} {
                display: flex;
            flex-direction: row;
            position: inherit;
            height: auto;
            width: auto;
            list-style: none;
            text-align: center;
            margin: 0;
            background: none;
    }
            `

export const GameMobileMenu = styled.div`
            display: flex;
            flex-direction: column;
            position: absolute;
            left: 0;
            top: 0;
            margin-top: 80px;
            width: 100vw;
            height: 100vh;
            display: ${({ gameClick }) => (!gameClick && 'none')};
            background: #101522;


            ${breakpoint.l} {
                display: none;
    }
`


export const StyledTitle = styled.h1`  
    font-size: 20px;
    color: white;
    font-weight: bold;
`

export const StyledSubtitle = styled.div`
    color: white;
    margin-top: 0px;
    margin-bottom: 0px;
`

export const StyledLink = styled(Link)`
    color: #fff;
    display: flex;
    text-decoration: none;
    padding-left: 20px;
    height: auto;
    
    &:hover {
        border-left: 2px solid #4b59f7;
    }
`

export const StyledGameNavigation = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`