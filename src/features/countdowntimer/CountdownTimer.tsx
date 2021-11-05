import styled from "@emotion/styled/macro"
import { useEffect, useState } from "react"


interface ICountdownTimerProps {
    countdownDate: Date;
}

export const CountdowndTimer = ({ countdownDate }: ICountdownTimerProps) => {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const [days, setDays] = useState(100);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const countdown = countdownDate.getTime()
            const now = new Date().getTime();
            const distance = countdown - now;

            setDays(Math.floor(distance / (day)));
            setHours(Math.floor((distance % (day)) / (hour)));
            setMinutes(Math.floor((distance % (hour)) / (minute)));
            setSeconds(Math.floor((distance % (minute)) / second));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [countdownDate, day, hour, minute])


    return (
        <StyledCountdownTimer>
            <StyledHeadline>Countdown to mainnet release</StyledHeadline>
            <StyledCountdown>
                <StyledCountdownList>
                    <StyledCountdownElement>
                        <StyledNumber>{days}</StyledNumber>
                        <StyledText>days</StyledText>
                    </StyledCountdownElement>
                    <StyledCountdownElement>
                        <StyledNumber>{hours}</StyledNumber>
                        <StyledText>Hours</StyledText>
                    </StyledCountdownElement>
                    <StyledCountdownElement>
                        <StyledNumber>{minutes}</StyledNumber>
                        <StyledText>Minutes</StyledText>
                    </StyledCountdownElement>
                    <StyledCountdownElement>
                        <StyledNumber>{seconds}</StyledNumber>
                        <StyledText>Seconds</StyledText>
                    </StyledCountdownElement>
                </StyledCountdownList>
            </StyledCountdown>
        </StyledCountdownTimer>
    )
}

const StyledCountdownTimer = styled.div`

`

const StyledCountdown = styled.div`
    display: flex;
    justify-content: center;
`

const StyledCountdownList = styled.div`
    display: flex;
    flex-direction: row;
`

const StyledHeadline = styled.h1`
    font-weight: normal;
    letter-spacing: .125rem;
    text-transform: uppercase;
`

const StyledCountdownElement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    text-transform: uppercase;
`

const StyledNumber = styled.span`
    display: block;
    font-size: 4.5rem;
`

const StyledText = styled.span`
    display: block;
    font-size: 1.5em;
`
