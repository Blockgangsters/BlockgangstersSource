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
flex-direction: column; // row -> horizontally
color: white;
display: flex;
height: 6vh;
width: 20vw;
position: fixed;
justify-content: center;
background: rgba(16,21,34,.9);
align-items: center;
`

export const BootstrapInner = styled(Container)`
flex-direction: column; // row -> horizontally
color: white;
display: flex;
height: 6vh;
width: 17vw;
padding-bottom: 10px;
padding-top: 10px;
position: fixed;
justify-content: center;
align-items: center;
border: 1px #A27818 solid;
border-radius: 15px;
    
    animation: blink 3s;
    animation-iteration-count: infinite;
}

@keyframes blink { 50% { border-color: #5EA022 ; }  }
`

export const BootstrapText = styled.span`
color: white;
font-size: 10px;
display: inline-block;
padding-left: 0.5vw;
`

export const ReceiveContainer = styled.div`
color: white;
font-size: 10px;
display: flex;
padding-left: 0.5vw;
`

export const CounterWrapper = styled.div`
color: white;
flex-direction: row; // row -> horizontally
display: inline;
`

export const RulesWrapper = styled.ul`
color: white;
flex-direction: row; // row -> horizontally
display: inline;
font-size: 25px;
`

export const RulesItem = styled.li`
color: white;
flex-direction: row; // row -> horizontally
list-style-type: none; /* Remove bullets */
padding-left: 10px; /* Remove padding */
font-size: 15px;
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

export const BuyButton = styled.button`
border-radius: 4px;
background: #2D5A03;
white-space: nowrap;
padding: 1px 20px;
color: white;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;

&:hover {
    transition: all 0.3s ease-out;
    background: #5FAA19;
}

@media screen and (max-width: 960px) {
    width: 200px;
}
`