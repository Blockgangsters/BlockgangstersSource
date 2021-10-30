import React from 'react';
import NumberFormat from "react-number-format";
import {BootstrapContainer, BootstrapText, LevelsItem, FirstTitleBox, SecondTitleBox, GamebarContainerOne, GamebarContainerTwo, GameItemFirst, GameItem, GameLinks } from './Gamebar.elements';
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import {EthContext} from '../../App';
import AnimatedNumbers from "react-animated-numbers";

const Gamebar = () => {
    const [defenseState, , attackState, , , , , , inGameFunds, , jailSeconds, attorneySeconds, attackSeconds, crimeSeconds, trainSeconds, crowdfundSeconds] = React.useContext(EthContext);

    return (
        <>
        <BootstrapContainer><><AnimatedNumbers
        includeComma
        animateToNumber={200}
        fontStyle={{ fontSize: 20 }}
        configs={[
          { mass: 1, tension: 220, friction: 100 },
          { mass: 1, tension: 180, friction: 130 },
          { mass: 1, tension: 280, friction: 90 },
          { mass: 1, tension: 180, friction: 135 },
          { mass: 1, tension: 260, friction: 100 },
          { mass: 1, tension: 210, friction: 180 },
        ]}
      ></AnimatedNumbers><BootstrapText>/ 1,000</BootstrapText> </></BootstrapContainer>
        <GamebarContainerOne>
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

        </GamebarContainerOne><GamebarContainerTwo>
        <LevelsItem>
        Defense level: {Math.floor(defenseState/1000000)}<ProgressBar animated variant="success" now={(defenseState % 1000000)/10000} label={`${(defenseState % 1000000)/10000}%`} />
        Attack level: {Math.floor(attackState/1000000)} <ProgressBar animated variant="danger" now={attackState % 1000000/10000} label={`${(attackState % 1000000)/10000}%`} />
        {jailSeconds === 0 ? <small style={{ color: 'green' }}> Not in jail </small> : <small style={{ color: 'red' }}> Jailed ({jailSeconds})</small>}<br />
        {attorneySeconds === 0 ? <small style={{ color: 'green' }}> Attorney available </small>  : <small style={{ color: 'red' }}> Attorney used ({attorneySeconds}) </small>}<br />
        {attackSeconds > 0 ? <small style={{ color: 'red' }}> Attack cooldown ({attackSeconds})</small>  :<small style={{ color: 'green' }}> Attack available</small>}<br />
        {crimeSeconds > 0 ? <small style={{ color: 'red' }}> Crime cooldown ({crimeSeconds})</small>  :<small style={{ color: 'green' }}> Crime available</small>}<br />
        {trainSeconds > 0 ? <small style={{ color: 'red' }}> Training cooldown ({trainSeconds})</small>  :<small style={{ color: 'green' }}> Training available</small>}<br />
        {crowdfundSeconds > 0 ? <small style={{ color: 'red' }}> Crowdfund time left ({crowdfundSeconds})</small>  :<small style={{ color: 'green' }}> Crowdfund available</small>}<br />

        <NumberFormat 
                                    value={inGameFunds}
                                    displayType={"text"}
                                    decimalSeparator={"."}
                                    thousandSeparator={true}
                                    decimalScale={4}
                                    prefix={"₲: "} />
        </LevelsItem>

        </GamebarContainerTwo>
</>

    )
}

export default Gamebar
