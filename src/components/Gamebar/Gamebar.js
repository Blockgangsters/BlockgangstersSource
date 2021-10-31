import React from 'react';
import NumberFormat from "react-number-format";
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { EthContext } from '../../App';
import AnimatedNumbers from "react-animated-numbers";
import { receiveEth } from '../../components/EthFunctions';
import Popup from 'reactjs-popup';
import { SubmitButton } from '../../globalStyles'
import styled from '@emotion/styled/macro';

import { Container } from '../../globalStyles';
import { Link } from 'react-router-dom'

const Gamebar = () => {
    const [defenseState, , attackState, , , , , , inGameFunds, , jailSeconds, attorneySeconds, attackSeconds, crimeSeconds, trainSeconds, crowdfundSeconds, , , bootstrapUsed, protectionHours] = React.useContext(EthContext);
    const [popUp, setPopUp] = React.useState(false);
    const [inputValue, setInputValue] = React.useState();

    const onChangeHandler = event => {
        setInputValue(event);
    };

    return (
        <>
            <StyledPopup open={popUp} onClose={() => setPopUp(false)} position="center center" modal closeOnDocumentClick>
                {() => (
                    <>
                        <RulesWrapper>Rules:
                            <RulesItem> Max 1000 MATIC per player (can be in multiple transactions).</RulesItem>
                            <RulesItem> Max 1000 players.</RulesItem>
                            <RulesItem> End date December 31, 2021.</RulesItem>
                        </RulesWrapper>Amount:
                        <NumberFormat
                            thousandsGroupStyle="thousand"
                            value={inputValue}
                            prefix="MATIC  "
                            decimalSeparator="."
                            displayType="input"
                            type="text"
                            thousandSeparator={true}
                            allowNegative={false}
                            onValueChange={({ value }) => {
                                onChangeHandler(value)
                            }} />
                        <SubmitButton onClick={() => { setPopUp(false); receiveEth(inputValue.toString()) }}> Go for it! </SubmitButton>
                        <ReceiveContainer>
                            Amount to receive: ₲<NumberFormat
                                value={inputValue * 1000000}
                                displayType={"text"}
                                decimalSeparator={"."}
                                thousandSeparator={true}
                                decimalScale={0} />
                        </ReceiveContainer>
                    </>
                )}
            </StyledPopup>
            <BootstrapContainer>
                <BootstrapInner> Bootstrap slots available
                    <CounterWrapper> <BootstrapText>
                        <AnimatedNumbers
                            includeComma
                            animateToNumber={bootstrapUsed}
                            fontStyle={{ fontSize: 10, color: "white" }}
                            configs={[
                                { mass: 1, tension: 220, friction: 100 },
                                { mass: 1, tension: 180, friction: 130 },
                                { mass: 1, tension: 280, friction: 90 },
                                { mass: 1, tension: 180, friction: 135 },
                                { mass: 1, tension: 260, friction: 100 },
                                { mass: 1, tension: 210, friction: 180 },
                            ]}
                        >
                        </AnimatedNumbers></BootstrapText>
                        <BootstrapText> / 1,000 slots used</BootstrapText> <BuyButton onClick={() => { setPopUp(true) }}> Buy!</BuyButton>
                    </CounterWrapper>
                </BootstrapInner>
            </BootstrapContainer>
            <StyledGameNavigation>
                <FirstTitleBox> Control Panel </FirstTitleBox>
                <GameItemFirst>
                    <GameLinks to='/deposit'>
                        Deposit or Withdraw
                    </GameLinks>
                </GameItemFirst>
                <SecondTitleBox> Lone wolf </SecondTitleBox>
                <GameItem>
                    <GameLinks to='/indprotection'>
                        Buy protection
                    </GameLinks>
                </GameItem>
                <GameItem>
                    <GameLinks to='/attackplayer'>
                        Attack a player
                    </GameLinks>
                </GameItem>

                <GameItem>
                    <GameLinks to='/crime'>
                        Crime in the city
                    </GameLinks>
                </GameItem>
                <GameItem>
                    <GameLinks to='/crowdfunding'>
                        Crowdfunding
                    </GameLinks>
                </GameItem>
                <GameItem>
                    <GameLinks to='/trainstats'>
                        Train stats
                    </GameLinks>
                </GameItem>
                <SecondTitleBox> Family </SecondTitleBox>
                <GameItem>
                    <GameLinks to='/familycontrol'>
                        Family control page
                    </GameLinks>
                </GameItem>
                <GameItem>
                    <GameLinks to='/familyshop'>
                        Family shop
                    </GameLinks>
                </GameItem>

                <GameItem>
                    <GameLinks to='/attackfamily'>
                        Family attack
                    </GameLinks>
                </GameItem>
                <GameItem>
                    <GameLinks to='/overview'>
                        Family list
                    </GameLinks>
                </GameItem>

                <SecondTitleBox> Leaderboards </SecondTitleBox>
                <GameItem>
                    <GameLinks to='/richestplayers'>
                        Richest players
                    </GameLinks>
                </GameItem>

                <GameItem>
                    <GameLinks to='/highestlevels'>
                        Highest levels
                    </GameLinks>
                </GameItem>
                <GameItem>
                    <GameLinks to='/statistics'>
                        Statistics
                    </GameLinks>
                </GameItem>

            </StyledGameNavigation>
            <StyledGameStats>
                <LevelsItem>
                    Defense level: {Math.floor(defenseState / 1000000)}<ProgressBar animated variant="success" now={(defenseState % 1000000) / 10000} label={`${(defenseState % 1000000) / 10000}%`} />
                    Attack level: {Math.floor(attackState / 1000000)} <ProgressBar animated variant="danger" now={attackState % 1000000 / 10000} label={`${(attackState % 1000000) / 10000}%`} />
                    {jailSeconds === 0 ? <small style={{ color: 'green' }}> Not in jail </small> : <small style={{ color: 'red' }}> Jailed ({jailSeconds})</small>}<br />
                    {attorneySeconds === 0 ? <small style={{ color: 'green' }}> Attorney available </small> : <small style={{ color: 'red' }}> Attorney used ({attorneySeconds}) </small>}<br />
                    {attackSeconds > 0 ? <small style={{ color: 'red' }}> Attack cooldown ({attackSeconds})</small> : <small style={{ color: 'green' }}> Attack available</small>}<br />
                    {crimeSeconds > 0 ? <small style={{ color: 'red' }}> Crime cooldown ({crimeSeconds})</small> : <small style={{ color: 'green' }}> Crime available</small>}<br />
                    {trainSeconds > 0 ? <small style={{ color: 'red' }}> Training cooldown ({trainSeconds})</small> : <small style={{ color: 'green' }}> Training available</small>}<br />
                    {crowdfundSeconds > 0 ? <small style={{ color: 'red' }}> Crowdfund time left ({crowdfundSeconds})</small> : <small style={{ color: 'green' }}> Crowdfund available</small>}<br />

                    <NumberFormat
                        value={inGameFunds}
                        displayType={"text"}
                        decimalSeparator={"."}
                        thousandSeparator={true}
                        decimalScale={4}
                        prefix={"₲: "} />
                </LevelsItem>

            </StyledGameStats>
        </>

    )
}

export default Gamebar

const StyledPopup = styled(Popup)`
    justify-content: center;
    align-items: center;
    display: flex;

    &-overlay {
        opacity: 1;
    }
    &-content {
        background: rgba(16,21,34,.9);
        width: 400px;
        height: 250px;
        border: #505064;
        border-radius: 15px;
        border-width: 5px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        display: flex;
    }
`

export const BootstrapContainer = styled(Container)`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    color: white;
    align-items: center;
`

export const BootstrapInner = styled(Container)`
    display: flex;
    flex-direction: column; // row -> horizontally
    color: white;
    padding-bottom: 10px;
    padding-top: 10px;
    justify-content: center;
    align-items: center;
    border: 1px #A27818 solid;
    border-radius: 15px;
    animation: blink 3s;
    animation-iteration-count: infinite;

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
    
    flex-direction: row; 
    display: inline;
`

export const RulesWrapper = styled.ul`
    color: white;
    
    flex-direction: row; 
    display: inline;
    font-size: 25px;
`

export const RulesItem = styled.li`
    color: white;
    flex-direction: row; 
    list-style-type: none; 
    padding-left: 10px;
    font-size: 15px;
`

export const StyledGameNavigation = styled(Container)`
    display: block;
    border: 24px solid;
    border-style: solid;
    border-color: transparent; 

`

export const StyledGameStats = styled(Container)`
    border: 24px solid;
    border-style: solid;
    border-color: transparent;
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