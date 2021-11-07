import styled from "@emotion/styled/macro"
import AnimatedNumbers from "react-animated-numbers";

interface IBoostrapCounterProps {
    bootstrapUsed: number
}

export const BootstrapCounter = ({ bootstrapUsed }: IBoostrapCounterProps) => {
    return (
        <StyledBoostrapCounter>
            <AnimatedNumbers
                includeComma
                animateToNumber={bootstrapUsed}
                configs={[
                    { mass: 1, tension: 210, friction: 300 },
                ]}
            />
            <StyledBoostrapCounterText> /1,000 bootstrap slots used </StyledBoostrapCounterText>
        </StyledBoostrapCounter>
    )
}

const StyledBoostrapCounter = styled.div`
    display: flex;
`

const StyledBoostrapCounterText = styled.div`
    
`