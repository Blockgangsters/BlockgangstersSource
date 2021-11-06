import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import styled from '@emotion/styled/macro';
import { StateContext } from '../../App';
import { Link } from 'react-router-dom';
import { Colors } from '../../styles/theme/colors/Colors';
import { breakpoint } from '../../styles/theme/responsive/breakpoint';
import { CoinStats } from './coinstats/CoinStats';
import { ZIndex } from '../../styles/globals/ZIndex';

const Navbar = () => {

    const [click, setClick] = useState(false)
    const [, , , , , adminConnected,] = React.useContext(StateContext);
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    return (
        <StyledNavbar>
            <NavbarContainer>
                <StyledLogoLink to="/" onClick={closeMobileMenu}>
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
                <StyledMenuButton onClick={handleClick}>
                    {click
                        ? <FaTimes size={36} color='white' />
                        : <FaBars size={36} color='white' />}
                </StyledMenuButton>
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
    text-align: left;
    
    ${breakpoint.l} {
        padding: 0 10px;
        line-height: 80px;
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
`

export const StyledLogoLink = styled(Link)`
    font-family: 'The Godfather';
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    font-size: 30px;
    display: flex;
    align-items: center;

    ${breakpoint.l} {
        font-size: 65px;
    }
`

export const StyledLogo = styled.img` 
    padding-right: 5px;
    max-height: 80%;
    max-width: 80%;
`

export const StyledMenuButton = styled.div`
    cursor: pointer;
    z-index: ${ZIndex.NavIcon};
    display: flex;
    align-items: center;

    ${breakpoint.l} {
        display: none;
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

