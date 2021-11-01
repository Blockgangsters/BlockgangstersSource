import { Link } from 'react-router-dom'
import styled from '@emotion/styled/macro';

export const GameNavigation = () => {
    return (
        <StyledGameNavigation>
            <StyledTitle> Control Panel: </StyledTitle>
            <StyledLink to='/deposit'>Deposit or Withdraw</StyledLink>
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
            <StyledLink to='/statistics'>Statistics</StyledLink>
        </StyledGameNavigation>
    )
}

export const StyledGameNavigation = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`

export const StyledTitle = styled.div`
    color: white;
    font-weight: bold;
    padding-bottom: 8px;
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
    


    /* @media screen and (max-width: 960px) {
        text-align: center;
        padding: 2rem;
        width: 100px;
        display: table;
        
        &:hover {
            color: #4b59f7;
            transition: all 0.3s ease;
        }
    } */
`