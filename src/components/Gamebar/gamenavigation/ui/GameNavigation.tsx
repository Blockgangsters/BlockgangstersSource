import { Link } from 'react-router-dom'
import styled from '@emotion/styled/macro';
import { getIfActive } from '../../../EthFunctions';
import { useState, useEffect } from 'react';
export const GameNavigation = () => {
    const [activePlayer, setActivePlayer] = useState(false);
    useEffect(() => {
        const getActiveStatus = async () => {
            let resultActive = await getIfActive();
            setActivePlayer(resultActive)
        }

        getActiveStatus();
    }, []); // trigger on setTriggerEvents if we want to update every 20s

    return (
        <StyledGameNavigation>
            {activePlayer === false ? <>
                <StyledTitleIdle> Control Panel </StyledTitleIdle>
                <StyledLinkIdle to='/deposit'>Deposit/Withdraw</StyledLinkIdle>
                <StyledSubtitleIdle> Lone wolf </StyledSubtitleIdle>
                <StyledLinkIdle to='/indprotection'>Buy protection</StyledLinkIdle>
                <StyledLinkIdle to='/attackplayer'>Attack a player</StyledLinkIdle>
                <StyledLinkIdle to='/crime'>Crime in the city</StyledLinkIdle>
                <StyledLinkIdle to='/crowdfunding'>Crowdfunding</StyledLinkIdle>
                <StyledLinkFade to='/trainstats'>Train stats to start!</StyledLinkFade>
                <StyledSubtitleIdle> Family </StyledSubtitleIdle>
                <StyledLinkIdle to='/familycontrol'>Family control page</StyledLinkIdle>
                <StyledLinkIdle to='/familyshop'>Family shop</StyledLinkIdle>
                <StyledLinkIdle to='/attackfamily'>Family attack</StyledLinkIdle>
                <StyledLinkIdle to='/overview'>Family list</StyledLinkIdle>
                <StyledSubtitleIdle> Leaderboards </StyledSubtitleIdle>
                <StyledLinkIdle to='/richestplayers'>Richest players</StyledLinkIdle>
                <StyledLinkIdle to='/highestlevels'>Highest levels</StyledLinkIdle>
                <StyledLinkIdle to='/statistics'>Statistics</StyledLinkIdle> </> :

                <>
                    <StyledTitle> Control Panel </StyledTitle>
                    <StyledLink to='/deposit'>Deposit/Withdraw</StyledLink>
                    <StyledSubtitle> Lone wolf </StyledSubtitle>
                    <StyledLink to='/indprotection'>Buy protection</StyledLink>
                    <StyledLink to='/attackplayer'>Attack a player</StyledLink>
                    <StyledLink to='/crime'>Crime in the city</StyledLink>
                    <StyledLink to='/crowdfunding'>Crowdfunding</StyledLink>
                    <StyledLink to='/trainstats'>Train stats</StyledLink>
                    <StyledSubtitle> Family </StyledSubtitle>
                    <StyledLink to='/familycontrol'>Family control page</StyledLink>
                    <StyledLink to='/familyshop'>Family shop</StyledLink>
                    <StyledLink to='/attackfamily'>Family attack</StyledLink>
                    <StyledLink to='/overview'>Family list</StyledLink>
                    <StyledSubtitle> Leaderboards </StyledSubtitle>
                    <StyledLink to='/richestplayers'>Richest players</StyledLink>
                    <StyledLink to='/highestlevels'>Highest levels</StyledLink>
                    <StyledLink to='/statistics'>Statistics</StyledLink> </>}
        </StyledGameNavigation>
    )
}

export const StyledGameNavigation = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`

export const StyledTitle = styled.h1`  
    font-size: 20px;
    color: white;
    font-weight: bold;
`

export const StyledSubtitle = styled.div`
    color: white;
    margin-top: 0px;
    margin-bottom: 0px;
`


export const StyledItem = styled.div`
`

export const StyledLink = styled(Link)`
    color: #fff;
    display: flex;
    text-decoration: none;
    padding-left: 20px;
    height: 100%;
    
    &:hover {
        border-left: 2px solid #4b59f7;
    }
`

export const StyledLinkFade = styled(Link)`
    color: #fff;
    display: flex;
    text-decoration: none;
    padding-left: 20px;
    height: 100%;

        animation-name: bounce-7;
    animation-duration: 2s; /* or: Xms */
    animation-iteration-count: infinite;
    animation-direction: alternate; /* or: normal */
animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);    animation-fill-mode: forwards; /* or: backwards, both, none */
     &:hover {
        border-left: 2px solid #4b59f7;
    }
        @keyframes bounce-7 {
        0%   { transform: scale(1,1)      translateX(0); }
        10%  { transform: scale(1.1,.9)   translateX(0); }
        30%  { transform: scale(.9,1.1)   translateX(+30px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateX(-7px); }
        64%  { transform: scale(1,1)      translateX(0); }
        100% { transform: scale(1,1)      translateX(0); }
    }
`

export const StyledLinkIdle = styled(Link)`
    color: grey;
    display: flex;
    text-decoration: none;
    padding-left: 20px;
    height: 100%;
    
    &:hover {
        border-left: 2px solid #4b59f7;
    }
`

export const StyledTitleIdle = styled.h1`  
    font-size: 20px;
    color: grey;
    font-weight: bold;
`

export const StyledSubtitleIdle = styled.div`
    color: grey;
    margin-top: 0px;
    margin-bottom: 0px;
`