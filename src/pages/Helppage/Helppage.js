import React from 'react';
import { ListItem, UnorderedList, Hyperlink, StyledLinkWhite } from './Helppage.elements';
import styled from '@emotion/styled/macro';
import { Colors } from '../../styles/theme/colors/Colors';
import { breakpoint } from '../../styles/theme/responsive/breakpoint';

const Helppage = () => {

  return (

    <StyledHome>
      <StyledPageSection>

        <StyledSectionPart>

          <StyledTitle>Migration to polygon.</StyledTitle>
          The main currency on the Polygon network is MATIC. To do any transaction on the Polygon network, fees have to be paid in MATIC. Before moving to Polygon, one should purchase MATIC tokens on another chain. In this example, we are purchasing MATIC on Ethereum. Among other options, the following sources are available:
          <UnorderedList>
            <ListItem><Hyperlink href="https://www.coinbase.com/price/polygon" target="_blank" rel="noreferrer noopener">Coinbase</Hyperlink></ListItem>
            <ListItem><Hyperlink href="https://www.binance.com/en/trade/MATIC_USDT" target="_blank" rel="noreferrer noopener">Binance</Hyperlink></ListItem>
            <ListItem><Hyperlink href="https://v2.info.uniswap.org/pair/0x819f3450da6f110ba6ea52195b3beafa246062de" target="_blank" rel="noreferrer noopener">Uniswap</Hyperlink></ListItem>
          </UnorderedList>
          To move your funds from Ethereum mainnet to Polygon, it is recommended to use the official <Hyperlink href="https://wallet.polygon.technology/bridge" target="_blank" rel="noreferrer noopener">Polygon bridge</Hyperlink>.
          When moving from other chains, one can use <Hyperlink href="https://www.xpollinate.io/" target="_blank" rel="noreferrer noopener">xpollinate.io</Hyperlink>. Hereafter, the official When moving from other chains, one can use <Hyperlink href="https://wallet.polygon.technology/swap/" target="_blank" rel="noreferrer noopener">Swap for Gas</Hyperlink> function can be used to convert to MATIC.
          Adding Polygon to Metamask can be achieved via this <Hyperlink href="https://community.metamask.io/t/how-to-add-custom-networks-to-metamask-like-binance-and-polygon-matic/3634" target="_blank" rel="noreferrer noopener">Metamask community page</Hyperlink>.
        </StyledSectionPart>
      </StyledPageSection>

      <StyledPageSection>
        <StyledSectionPart>

          <StyledTitle>On-boarding to Blockgangsters</StyledTitle>
          The onboarding process to Blockgangsters.io is fairly simple. Option one is depositing funds via the <StyledLinkWhite href="https://blockgangsters.io/#/deposit" rel="noreferrer noopener">deposit function</StyledLinkWhite>.
          The second option is by training your attack or defense for the first time.
          The contract is coded such that performing your first training triggers your profile to be an active profile. <StyledLinkWhite href="https://blockgangsters.io/#/trainstats" rel="noreferrer noopener">Click here</StyledLinkWhite> to perform your first training.
          Withdrawing all your funds from the game will in turn remove your account from the active profiles. That is, it will be ignored in attacks, families et cetera.
        </StyledSectionPart>


      </StyledPageSection>
    </StyledHome>
  )
}

export default Helppage

const StyledHome = styled.div`

`
const StyledPageSection = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    color: ${Colors.White};
    background: ${Colors.DarkTransparant};
    padding: 16px 16px;
    max-width: 100%;
    
    ${breakpoint.m} {
        flex-direction: row;
        width: 80%;
        margin-left: 20%;
        padding: 60px 50px;
    }

    :nth-child(even) {
        background: ${Colors.LightTransparant};
        color: ${Colors.Black};
    }
`

const StyledSectionPart = styled.div`
    display: inline;
    flex-direction: column;
    
    ${breakpoint.l} {
        justify-content: center;
        width: 50%;
    }
`


const StyledTitle = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
`
