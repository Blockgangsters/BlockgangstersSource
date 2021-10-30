import styled from 'styled-components';
import {Container} from '../../globalStyles';
import {Link} from 'react-router-dom';

// set background to 101522 to match top
export const gameNav = styled.nav`
height: 100vh; 
margin-top: -80px;
background: rgba(16,21,34,.9);
`

export const BootstrapContainer = styled(Container)`
color: white;
display: flex;
height: 6vh;
width: 20vw;
margin-top: 0px; 
padding-bottom: 10px;
position: fixed;
justify-content: center;
background: rgba(16,21,34,.9);
align-items: center;
display: block;
`

export const BootstrapText = styled.h4`
color: white;
font-size: 20px;
display: inline-block;
`

export const GamebarContainerOne = styled(Container)`
display: flex;
border: 24px solid;
border-style: solid;
border-color: transparent; 
height: 52vh; // 42, was 50
width: 20vw;
margin-top: 6vh; 
position: fixed;
justify-content: center;
background: rgba(16,21,34,.9);
align-items: center;
display: block;
`

export const GamebarContainerTwo = styled(Container)`
background: rgba(16,21,34,.9);
display: flex;
border: 24px solid;
border-style: solid;
border-color: transparent;
height: 50vh;
width: 20vw;
margin-top: 58vh; 
margin-bottom: 3vh;
position: fixed;
justify-content: center;
align-items: center;
display: block;
`


// -- comments --
// margin-top: -80px to put it over the navibar --> thus also z-index
// absolute position to fix it to the left! --> but then it will scroll
// position fixed = fix to left + no scroll

export const FirstTitleBox = styled.div`
color: white;
margin-top: 5px;
margin-bottom: 20px;
height: 1vh;
margin-left: -35px;
`

export const SecondTitleBox = styled.div`
color: white;
margin-top: 0px;
margin-bottom: 0px;
margin-left: -35px;
`

export const GameItemFirst = styled.div`
height: 2.5vh;
line-height: 2.5vh;
margin-right: -30px;
margin-left: -35px;
align: center;


    
    &:hover {
        border-left: 2px solid #4b59f7;
    }

    @media screen and (max-width: 960px) {
        width: 100%;

        &:hover {
            border: none;
        }
    }
`

export const GameItem = styled.div`
height: 2.5vh;
line-height: 2.5vh;
margin-right: -30px;

margin-left: -35px;

    
    &:hover {
        border-left: 2px solid #4b59f7;
    }

    @media screen and (max-width: 960px) {
        width: 100%;

        &:hover {
            border: none;
        }
    }
`

export const LevelsItem = styled.div`
height: 30px;
margin-right: -30px;
line-height: 25px;
color: white;
margin-left: -35px;


    @media screen and (max-width: 960px) {
        width: 100%;

        &:hover {
            border: none;
        }
    }
`

export const GameLinks = styled(Link)`
    color: #fff;
    display: flex;
    text-decoration: none;
    padding: 0 0 0 20px;
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