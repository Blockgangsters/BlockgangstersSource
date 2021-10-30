import React  from 'react';
import {TokenomicsContainer, TextWrapper, Heading, ListItem, UnorderedList, PageWrapper, AllocationContainer, HeadingPie, PieTextWrapper, Hyperlink, HyperlinkWhite} from './Helppage.elements';


const Helppage = () => {

    return (

      <PageWrapper>
        <TokenomicsContainer>

          <TextWrapper>
            
            <Heading>Migration to polygon.</Heading>
            The main currency on the Polygon network is MATIC. To do any transaction on the Polygon network, fees have to be paid in MATIC. Before moving to Polygon, one should purchase MATIC tokens on another chain. In this example, we are purchasing MATIC on Ethereum. Among other options, the following sources are available:
            <UnorderedList>
              <ListItem><Hyperlink href="https://www.coinbase.com/price/polygon" target="_blank" rel="noreferrer noopener">Coinbase</Hyperlink></ListItem>
              <ListItem><Hyperlink href="https://www.binance.com/en/trade/MATIC_USDT" target="_blank" rel="noreferrer noopener">Binance</Hyperlink></ListItem>
              <ListItem><Hyperlink href="https://v2.info.uniswap.org/pair/0x819f3450da6f110ba6ea52195b3beafa246062de" target="_blank" rel="noreferrer noopener">Uniswap</Hyperlink></ListItem>
            </UnorderedList>  
            To move your funds from Ethereum mainnet to Polygon, it is recommended to use the official <nobr><Hyperlink href="https://wallet.polygon.technology/bridge" target="_blank" rel="noreferrer noopener">Polygon bridge</Hyperlink>.</nobr>
            <nobr>Adding Polygon to Metamask can be achieved via this <Hyperlink href="https://community.metamask.io/t/how-to-add-custom-networks-to-metamask-like-binance-and-polygon-matic/3634" target="_blank" rel="noreferrer noopener">Metamask community page</Hyperlink>.</nobr>
          </TextWrapper>
        </TokenomicsContainer>

        <AllocationContainer>
          <PieTextWrapper>
          
            <HeadingPie>On-boarding to Blockgangsters</HeadingPie>
                The onboarding process to Blockgangsters.io is fairly simple. Option one is depositing funds via the <HyperlinkWhite href="https://blockgangsters.io/#/deposit" rel="noreferrer noopener">deposit function</HyperlinkWhite>.
                The second option is by training your attack or defense for the first time.
                The contract is coded such that performing your first training triggers your profile to be an active profile. <HyperlinkWhite href="https://blockgangsters.io/#/trainstats" rel="noreferrer noopener">Click here</HyperlinkWhite> to perform your first training.
                 Withdrawing all your funds from the game will in turn remove your account from the active profiles. That is, it will be ignored in attacks, families et cetera. 
          </PieTextWrapper>

          
        </AllocationContainer>
   </PageWrapper>
    )
}

export default Helppage