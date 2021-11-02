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
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;

`
const NavbarContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    height: 80px;
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

const NavLogo = styled(Link)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 30px;
    display: flex;
    align-items: center;
`

const NavIcon = styled.img` 
    margin-right: 5px;
    max-height: 60px;
`

const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 960px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`

const NavMenu = styled.ul`
    display: flex;
    align-items: left;
    list-style: none;
    text-align: center;
    padding: 16px;
    
    @media screen and (max-width: 960px) {
        padding: 32px;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: ${({ click }) => (click ? 0 : '-100%')};
        opacity: 1;
        transition: all 0.5s ease;
        background: #101522;
    }
` 
