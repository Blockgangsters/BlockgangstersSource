import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import styled from '@emotion/styled/macro';
import { StateContext } from '../../App';
import { Link } from 'react-router-dom';
import { Colors } from '../../styles/theme/colors/Colors';
import { breakpoint } from '../../styles/theme/responsive/breakpoint';
import { CoinStats } from './coinstats/CoinStats';
import { IconContext } from 'react-icons/lib'
import { ZIndex } from '../../styles/globals/ZIndex';


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
                    Blockgangsters
                </NavLogo>
                

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
                <MobileIcon onClick={handleClick}>
                    <IconContext.Provider
                        value={{ color: 'white' }}
                    >
                        {click ? <FaTimes /> : <FaBars />}

                    </IconContext.Provider>
                </MobileIcon>
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

export const NavLogo = styled(Link)`
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    font-size: 30px;
    display: flex;
    align-items: center;
`

export const NavIcon = styled.img` 
    margin-right: 5px;
    max-height: 80%;
    width: auto;
`

export const MobileIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    z-index: 110;

    ${breakpoint.l} {
        display: none;
    }
`

export const NavMenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 80px;
    width: 100vw;
    height: 100vh;
    left: ${({ click }) => (click ? 0 : '-100%')};
    transition: all 0.5s ease;
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
    display: flex;
    justify-content: left;
    align-items: left;
    width: 300px;
    height: 120px;

    ${breakpoint.l} {
        display: none;
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
    justify-content: left;
    align-items: center;
    height: 120px;
    color: #fff;
    font-size: 1.2rem;
    &:hover {
        color: #4b59f7;
        transition: all 0.3s ease;
    }

    ${breakpoint.l} {
        list-style-type: none;
        justify-content: space-between;
        color: #fff;
        cursor: pointer;
        text-decoration: none;
        font-size: 0.8rem;
        text-align: left;
        padding-left: 0;
    }
`
export const StatsItem = styled.li`
    position: relative;
    padding: 7px 0px 0px 0px;
`
