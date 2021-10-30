import styled from 'styled-components';
import {Container} from '../../globalStyles';
import {Link} from 'react-router-dom';

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
${Container};
`

export const NavLogo = styled(Link)`
color: #fff;
justify-self: flex-start; // = to left side
cursor: pointer;
text-decoration: none;
font-size: 2rem;
display: flex;
align-items: center;
`

export const NavIcon = styled.img` //FaMagento is the logo 
margin-right: 0rem;
box-sizing: border-box;
max-height: 100%;
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

    @media screen and (max-width: 960px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90vh;
        position: absolute;
        top: 80px;
        left: ${({click}) => (click ? 0 : '-100%')};
        opacity: 1;
        transition: all 0.5s ease;
        background: #101522;
    }
`

export const NavItem = styled.li`
    height: 80px;
    border-bottom: 2px solid transparent;
    
    &:hover {
        border-bottom: 2px solid #4b59f7;
    }

    @media screen and (max-width: 960px) {
        width: 100%;

        &:hover {
            border: none;
        }
    }
`

export const NavLinks = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 0.8rem;
    height: 100%;

    @media screen and (max-width: 960px) {
        text-align: center;
        padding: 2rem;
        width: 100px;
        display: table;
        
        &:hover {
            color: #4b59f7;
            transition: all 0.3s ease;
        }
    }
    `

export const BetaLink = styled(Link)`
color: #fff;
width: 10vw;
display: flex;
align-items: center;
text-decoration: none;
padding: 0.5rem 0.5rem;
height: 100%;

@media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100px;
    display: table;
    
    &:hover {
        color: #4b59f7;
        transition: all 0.3s ease;
    }
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
    display: inline-block;
    text-align: left;

@media screen and (max-width: 960px) {
    display: table;
    justify-content: left;
    align-items: center;
    width: 200px;
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
    
@media screen and (max-width: 960px) {
    top: 0%;
    text-align: center;
        padding: 1rem;
        width: 400px;
        display: flex;

}
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