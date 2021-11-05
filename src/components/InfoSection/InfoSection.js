import React from 'react';
import { StyledInfoSection, InfoRow, InfoColumn, TextWrapper, TopLine, Heading, Subtitle, TimerText, SocialIcons, SocialIconLink, BootstrapText, BootstrapWrapper } from './InfoSection.elements';
import { Button } from '../../features/shared/ui/buttons/Button';
import { Link } from 'react-router-dom'
import { FaTelegram, FaTwitter, FaDiscord } from 'react-icons/fa';
import { StateContext, EthContext } from '../../App';
import { connectWallet } from '../EthFunctions'

import AnimatedNumbers from "react-animated-numbers";
import styled from '@emotion/styled/macro';
import { breakpoint } from '../../styles/theme/responsive/breakpoint';
import { CountdowndTimer } from '../../features/countdowntimer/CountdownTimer';

const InfoSection = ({ countdownTimer, bootstrapTimer, primary, lightBg, imgStart, lightTopLine, lightText, lightTextDesc, buttonLabel, description, headline, topLine, img, alt, start }) => {

    const [, , mmConnected, , ,] = React.useContext(StateContext);
    const [, , , , , , , , , , , , , , , , , , bootstrapUsed] = React.useContext(EthContext);

    return (
        <>
            <StyledInfoSection lightBg={lightBg}>
                <InfoRow imgStart={imgStart}>
                    <InfoColumn>
                        <TextWrapper>
                            {countdownTimer && <CountdowndTimer countdownDate={new Date('2021-11-15')} />}
                            {countdownTimer &&
                                <>
                                    <TimerText> Join us now on social media to get started right away! </TimerText>
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
                                </>}
                            {!countdownTimer &&
                                <>
                                    <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                                    <Heading lightText={lightText}>{headline}</Heading>
                                    <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                                    <Link to='/sign-up'>
                                        {mmConnected ? null : <Button big fontBig onClick={connectWallet} primary={primary}>{buttonLabel}</Button>}
                                    </Link>
                                </>}
                            {bootstrapTimer &&
                                <>
                                    <BootstrapWrapper>
                                        <AnimatedNumbers
                                            includeComma
                                            animateToNumber={bootstrapUsed}
                                            fontStyle={{ fontSize: 20 }}
                                            configs={[
                                                { mass: 1, tension: 220, friction: 100 },
                                                { mass: 1, tension: 180, friction: 130 },
                                                { mass: 1, tension: 280, friction: 90 },
                                                { mass: 1, tension: 180, friction: 135 },
                                                { mass: 1, tension: 260, friction: 100 },
                                                { mass: 1, tension: 210, friction: 1000 },
                                            ]}
                                        />
                                        <BootstrapText> /1,000 bootstrap slots used </BootstrapText>
                                    </BootstrapWrapper>
                                </>
                            }
                        </TextWrapper>
                    </InfoColumn>

                    <InfoColumn>
                        <StyledImage src={img} alt={alt} />
                    </InfoColumn>
                </InfoRow>
            </StyledInfoSection>
        </>
    )
}

export default InfoSection;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;

    ${breakpoint.l} {
        padding-left: 20px;
    }
`
