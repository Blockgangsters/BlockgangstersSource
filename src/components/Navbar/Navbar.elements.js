import styled from '@emotion/styled/macro';
import { Container } from '../../globalStyles';
import { Link } from 'react-router-dom';
import { breakpoint } from '../../styles/theme/responsive/breakpoint';

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

    &:hover {    
    }
`

export const NavbarContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    height: 80px;
`

export const NavLogo = styled(Link)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 30px;
    display: flex;
    align-items: center;
`

export const NavIcon = styled.img` 
    margin-right: 5px;
    max-height: 80%;
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
}
`

export const NavMenu = styled.ul`
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