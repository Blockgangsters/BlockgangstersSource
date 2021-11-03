import React from 'react';
import { TitleWrapper, ReleaseWrapper, InfoSec, InfoRow, InfoColumn, TextWrapper, TopLine, Heading, Subtitle, ImgWrapper, Img, CircleWrapper, TitleBox, TimerText, SocialIcons, SocialIconLink, BootstrapText, BootstrapWrapper } from './InfoSection.elements';
import { Container, Button } from '../../globalStyles'
import { Link } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { FaTelegram, FaTwitter, FaDiscord } from 'react-icons/fa';
import { StateContext, EthContext } from '../../App';
import { connectWallet } from '../EthFunctions'

import AnimatedNumbers from "react-animated-numbers";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;


const timerProps = {
    isPlaying: true,
    size: 90,
    strokeWidth: 6
};

const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;



const InfoSection = ({ countdownTimer, bootstrapTimer, primary, lightBg, imgStart, lightTopLine, lightText, lightTextDesc, buttonLabel, description, headline, topLine, img, alt, start }) => {
    // start CountdownCircle  
    const stratTime = Date.now() / 1000; // 23 10 21
    const endTime = 1637017200; // 1 nov 21
    const remainingTime = endTime - stratTime;
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;

    // start react-animated-numbers
    const [, , mmConnected, , ,] = React.useContext(StateContext);
    const [, , , , , , , , , , , , , , , , , , bootstrapUsed] = React.useContext(EthContext);

    return (
        <>
            <InfoSec lightBg={lightBg}>
                <Container>
                    <InfoRow imgStart={imgStart}>
                        <InfoColumn>
                            <TextWrapper>


                                {countdownTimer === true ? <ReleaseWrapper> <TitleWrapper to="/trainstats"> Release Candidate live on Mumbai testnet. Click here to start playing now!</TitleWrapper> <TitleBox> Main net release in: </TitleBox> <CircleWrapper> <CountdownCircleTimer
                                    {...timerProps}
                                    colors={[["#a9b3c1"]]}
                                    strokeWidth="12"
                                    trailColor="#101522"
                                    duration={daysDuration}
                                    initialRemainingTime={remainingTime}
                                >
                                    {({ elapsedTime }) =>
                                        renderTime("days", getTimeDays(daysDuration - elapsedTime))
                                    }
                                </CountdownCircleTimer>
                                    <CountdownCircleTimer
                                        {...timerProps}
                                        colors={[["#a9b3c1"]]}
                                        strokeWidth="12"
                                        duration={daySeconds}
                                        trailColor="#101522"
                                        initialRemainingTime={remainingTime % daySeconds}
                                        onComplete={(totalElapsedTime) => [
                                            remainingTime - totalElapsedTime > hourSeconds
                                        ]}
                                    >
                                        {({ elapsedTime }) =>
                                            renderTime("hours", getTimeHours(daySeconds - elapsedTime))
                                        }
                                    </CountdownCircleTimer>
                                    <CountdownCircleTimer
                                        {...timerProps}
                                        colors={[["#a9b3c1"]]}
                                        strokeWidth="12"
                                        duration={hourSeconds}
                                        trailColor="#101522"
                                        initialRemainingTime={remainingTime % hourSeconds}
                                        onComplete={(totalElapsedTime) => [
                                            remainingTime - totalElapsedTime > minuteSeconds
                                        ]}
                                    >
                                        {({ elapsedTime }) =>
                                            renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
                                        }
                                    </CountdownCircleTimer>
                                    <CountdownCircleTimer
                                        {...timerProps}
                                        colors={[["#a9b3c1"]]}
                                        duration={minuteSeconds}
                                        strokeWidth="12"
                                        trailColor="#101522"
                                        initialRemainingTime={remainingTime % minuteSeconds}
                                        onComplete={(totalElapsedTime) => [
                                            remainingTime - totalElapsedTime > 0
                                        ]}
                                    >
                                        {({ elapsedTime }) =>
                                            renderTime("seconds", getTimeSeconds(elapsedTime))
                                        }
                                    </CountdownCircleTimer></CircleWrapper> </ReleaseWrapper> : null}
                                {countdownTimer ? <> <TimerText> Join us now on social media to get started right away! </TimerText>
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


                                </>
                                    : <> <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                                        <Heading lightText={lightText}>{headline}</Heading>
                                        <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                                        <Link to='/sign-up'>
                                            {mmConnected ? null : <Button big fontBig onClick={connectWallet} primary={primary}>{buttonLabel}</Button>}
                                        </Link> </>}
                                {bootstrapTimer ? <><br></br>    <BootstrapWrapper>
                                    <AnimatedNumbers
                                        includeComma
                                        animateToNumber={bootstrapUsed}
                                        fontStyle={{ fontSize: 30 }}
                                        configs={[
                                            { mass: 1, tension: 220, friction: 100 },
                                            { mass: 1, tension: 180, friction: 130 },
                                            { mass: 1, tension: 280, friction: 90 },
                                            { mass: 1, tension: 180, friction: 135 },
                                            { mass: 1, tension: 260, friction: 100 },
                                            { mass: 1, tension: 210, friction: 1000 },
                                        ]}
                                    ></AnimatedNumbers></BootstrapWrapper><BootstrapText> / 1,000 bootstrap slots used </BootstrapText></> : null}
                            </TextWrapper>
                        </InfoColumn>

                        <InfoColumn>
                            <ImgWrapper start={start}>
                                <Img src={img} alt={alt} />
                            </ImgWrapper>
                        </InfoColumn>
                    </InfoRow>
                </Container>
            </InfoSec>
        </>
    )
}

export default InfoSection
