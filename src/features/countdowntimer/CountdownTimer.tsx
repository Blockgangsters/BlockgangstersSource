import styled from "@emotion/styled/macro"
import { useEffect, useState } from "react"
import { breakpoint } from "../../styles/theme/responsive/breakpoint";


interface ICountdownTimerProps {
    countdownDate: Date;
}

export const CountdowndTimer = ({ countdownDate }: ICountdownTimerProps) => {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const [days, setDays] = useState(0);
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
            <StyledHeadline>Countdown mainnet release</StyledHeadline>
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
    display: flex;
    flex-direction: column;
    align-items: center;
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
    font-size: 20px;
    font-weight: normal;
    letter-spacing: 2px;
    text-transform: uppercase;

    ${breakpoint.l} {
        font-size: revert;
        letter-spacing: .125rem;
    }

`

const StyledCountdownElement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    text-transform: uppercase;

    ${breakpoint.l} {
        padding: 1em;
    }

`

const StyledNumber = styled.span`
    display: block;
    font-size: 40px;

    ${breakpoint.l} {
        font-size: 4.5rem;
    }

`

const StyledText = styled.span`
    display: block;
    font-size: 20px;

    ${breakpoint.l} {
        font-size: 1.5em;
    }
`
