import React from 'react';
import { TokenomicsContainer, TextWrapper, Heading, ListItem, UnorderedList, AllocationContainer, HeadingPie, PieTextWrapper, Hyperlink, HyperlinkWhite } from './Helppage.elements';
import { PageWrapper } from '../../globalStyles'
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
          To move your funds from Ethereum mainnet to Polygon, it is recommended to use the official <nobr><Hyperlink href="https://wallet.polygon.technology/bridge" target="_blank" rel="noreferrer noopener">Polygon bridge</Hyperlink>.</nobr>
          <nobr>Adding Polygon to Metamask can be achieved via this <Hyperlink href="https://community.metamask.io/t/how-to-add-custom-networks-to-metamask-like-binance-and-polygon-matic/3634" target="_blank" rel="noreferrer noopener">Metamask community page</Hyperlink>.</nobr>
        </StyledSectionPart>
      </StyledPageSection>

      <StyledPageSection>
        <StyledSectionPart>

          <StyledTitle>On-boarding to Blockgangsters</StyledTitle>
          The onboarding process to Blockgangsters.io is fairly simple. Option one is depositing funds via the <HyperlinkWhite href="https://blockgangsters.io/#/deposit" rel="noreferrer noopener">deposit function</HyperlinkWhite>.
          The second option is by training your attack or defense for the first time.
          The contract is coded such that performing your first training triggers your profile to be an active profile. <HyperlinkWhite href="https://blockgangsters.io/#/trainstats" rel="noreferrer noopener">Click here</HyperlinkWhite> to perform your first training.
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
    max-width: 100vw;
    
    ${breakpoint.m} {
        flex-direction: row;
        width: 80vw;
        margin-left: 20vw;
        padding: 60px 50px;
    }

    :nth-child(even) {
        background: ${Colors.LightTransparant};
        color: ${Colors.Black};
    }
`

const StyledSectionPart = styled.div`
    display: flex;
    flex-direction: column;
    
    ${breakpoint.l} {
        justify-content: center;
        width: 50%;
    }
`

const StyledTimerText = styled.div`
    color: white;
    font-size: 20px;
    text-align: center;
`;

const StyledSocialIcons = styled.div`
    display: flex;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
`

const StyledSocialIconLink = styled.a`
    color: #fff;
    font-size: 24px;
    margin-left: 30px;
    margin-right: 30px;
`

const StyledImage = styled.img`
    width: 100%;
    height: 100%;

    ${breakpoint.l} {
        padding-left: 20px;
    }
`

const StyledTopLine = styled.div`
    font-size: 18px;
    line-height: 16px;
    letter-spacing: 1.4px;
    margin-bottom: 16px;
`;

const StyledTitle = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
`

const StyledSubtitle = styled.p`
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
`