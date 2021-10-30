import React from 'react';
import {Ulist, Uitem, FooterContainer, FooterSubscription, FooterSubHeading, FooterSubText, SocialMedia, SocialMediaWrap, SocialLogo, WebsiteRights, SocialIcons, SocialIconLink, SocialIcon} from './Footer.elements';
import {FaTelegram, FaTwitter, FaDiscord } from 'react-icons/fa';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterSubscription>
                <FooterSubHeading>
                    Join the underworld now to build your empire!
                </FooterSubHeading>
                <FooterSubText>Cash out from the control panel to your left.</FooterSubText>

            </FooterSubscription>


            <SocialMedia>
                <SocialMediaWrap>
                    <SocialLogo to="/">
                        <SocialIcon src={require("../../images/logo_gang_101522.png").default} to="/" />
                        Blockgangsters
                        </SocialLogo>
                        <WebsiteRights><Ulist><Uitem>BlockGangsters © 2021, All rights reserved</Uitem>
                        <Uitem>email us at info@blockgangsters.io</Uitem>
                        </Ulist>
                        </WebsiteRights>
                       
                        <SocialIcons>
                            <SocialIconLink href="https://discord.gg/j3JGYthB" target="_blank" aria-label="Discord">
                                <FaDiscord />
                            </SocialIconLink>
                            <SocialIconLink href="https://twitter.com/blockgangsters" target="_blank" aria-label="Twitter">
                                <FaTwitter />
                            </SocialIconLink>
                            <SocialIconLink href="https://t.me/joinchat/hIJ1FYLDul1jNGQ0" target="_blank" aria-label="Telegram">
                                <FaTelegram />
                            </SocialIconLink>
                    </SocialIcons>
                    
                </SocialMediaWrap>
            </SocialMedia>
        </FooterContainer>
    )
}

export default Footer


/*

            <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinksItems>
                    <FooterLinkTitle>
                        About Us
                    </FooterLinkTitle>
                        <FooterLink to='/'>The Team</FooterLink>
                        <FooterLink to='/'>Tokenomics</FooterLink>
                        <FooterLink to='/'>Roadmap</FooterLink>


                    </FooterLinksItems>  
                    <FooterLinksItems>
                    <FooterLinkTitle>
                        Social Media
                    </FooterLinkTitle>
                        <FooterLink to='/'>Twitter</FooterLink>
                        <FooterLink to='/'>Telegram</FooterLink>
                        <FooterLink to='/'>Discord</FooterLink>
                        <FooterLink to='/'>Reddit</FooterLink>
                    </FooterLinksItems>  
                </FooterLinksWrapper>
                <FooterLinksWrapper>
                    
                    <FooterLinksItems>
                    <FooterLinkTitle>
                        Trade GANG
                    </FooterLinkTitle>
                        <FooterLink to='/'>Trade $GANG on PancakeSwap</FooterLink>
                        <FooterLink to='/'>$GANG/BNB Liquidity Pool</FooterLink>
                    </FooterLinksItems>  
                    <FooterLinksItems>
                    <FooterLinkTitle>
                        Contract Info
                    </FooterLinkTitle>
                        <FooterLink to='/'>Contract</FooterLink>
                        <FooterLink to='/'>Functions explained</FooterLink>

                    </FooterLinksItems>  
                </FooterLinksWrapper>
            </FooterLinksContainer> 

            */

            