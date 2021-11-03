import React, { useState } from 'react';
import { Container } from '../../globalStyles';
import { FaBars, FaTimes } from 'react-icons/fa';
import styled from '@emotion/styled/macro';
import { StateContext } from '../../App';
import { Link } from 'react-router-dom';
import { Colors } from '../../styles/theme/colors/Colors';
import { breakpoint } from '../../styles/theme/responsive/breakpoint';
import { CoinStats } from './coinstats/CoinStats';
import { MetaMaskConnect } from './metamaskconnect/MetaMaskConnect';
import { IconContext } from 'react-icons/lib'


const Navbar = () => {

    const [click, setClick] = useState(false)
    const [, , , , , adminConnected,] = React.useContext(StateContext);
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    return (
        <StyledNavbar>
            <NavbarContainer>
                <NavLogo to="/" onClick={closeMobileMenu}>
                    <NavIcon src="images/logo_gang_101522.png" />
                    Blockgangsters.io
                </NavLogo>
                <MobileIcon onClick={handleClick}>
                    <IconContext.Provider
                        value={{ color: 'white' }}
                    >
                        {click ? <FaTimes /> : <FaBars />}

                    </IconContext.Provider>
                </MobileIcon>

                <NavMenu onClick={handleClick} click={click}>
                    <StyledBetaLink to="/helppage">Beta live on Polygon testnet! Click here for guide</StyledBetaLink>
                    <StyledNavLink to="/">Home</StyledNavLink>
                    <StyledNavLink to="/whitepaper">Whitepaper</StyledNavLink>
                    <StyledNavLink to="/contract">Contract</StyledNavLink>
                    <StyledNavLink to="/roadmap">Roadmap</StyledNavLink>
                    <StyledNavLink to="/tokenomics">Tokenomics</StyledNavLink>
                    {adminConnected && <StyledNavLink to="/admin">Admin page</StyledNavLink>}
                    <CoinStats />
                    <MetaMaskConnect />
                </NavMenu>
            </NavbarContainer>
        </StyledNavbar>
    )
}

export default Navbar;

const StyledNavbar = styled.nav`
    display: flex;
    justify-content: space-between;
    height: 80px;

    background: #101522;
    /* height: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;


`

const StyledNavLink = styled(Link)`
    color: ${Colors.White};
    text-decoration: none;
    text-align: left;
    
    ${breakpoint.m} {
        padding: 0 10px;
    }
`
const StyledBetaLink = styled(Link)`
    color: ${Colors.Red};
    font-size: 10px;
`

export const Nav = styled.nav`

    background: #101522;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;
    width: 100%;

    &:hover {    
    }
`

export const NavbarContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    height: 80px;
    max-width: 100%;
`

export const NavLogo = styled(Link)`
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    font-size: 30px;
    display: flex;
    align-items: center;
    max-width: 20vw;
`

export const NavIcon = styled.img` 
    margin-right: 5px;
    max-height: 80%;
    width: auto;
`

export const MobileIcon = styled.div`
    display: none;

@media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    z-index: 110;
}
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: left;
    list-style: none;
    text-align: center;
    padding: 16px;
    
    @media screen and (max-width: 960px) {
        padding: 0;
        margin-top: 80px;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        position: absolute;
        left: ${({ click }) => (click ? 0 : '-100%')};
        opacity: 1;
        transition: all 0.5s ease;
        background: #101522;
    }
`

export const NavItem = styled.div`
    border-bottom: 2px solid transparent;
    padding: 4px 0;
    
    &:hover {
        border-bottom: 2px solid #4b59f7;
    }

    ${breakpoint.m} {
        padding: 0 8px;
    }
`

export const NavLinks = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    `

export const BetaLink = styled(Link)`
    color: red;
    width: 100px;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 12px;

    &:hover {
        color: #4b59f7;
        transition: all 0.3s ease;
    }
`

export const NavItemBtn = styled.li`
    @media screen and (max-width: 960px) {
        display: flex;
        justify-content: left;
        align-items: left;
        width: 300px;
        height: 120px;
    }
`

export const NavBtnLink = styled(Link)`
    display: flex;
    justify-content: left;
    align-items: center;
    text-decoration: none;
    padding: 8px 16px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
`

export const StatsContainer = styled.ul`
    list-style-type: none;
    justify-content: space-between;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    font-size: 0.8rem;
    text-align: left;
    padding-left: 0;

    @media screen and (max-width: 960px) {
        /* display: table; */
        justify-content: left;
        align-items: center;
        /* width: 200px; */
        height: 120px;
        color: #fff;
        font-size: 1.2rem;
        &:hover {
            color: #4b59f7;
            transition: all 0.3s ease;
        }
    }
`
export const StatsItem = styled.li`
    position: relative;
    padding: 7px 0px 0px 0px;
`

export const MMConnect = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    text-decoration: none;
    padding: 4px 8px;
    height: 10px;
    width: 100%;
    border: none;
    outline: none;
    color: red;
    @media screen and (max-width: 960px) {
        align-items: top;   
    }
`