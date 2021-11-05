import styled from "@emotion/styled/macro"

interface IProgressBarProps {
    percentage: number;
}

export const ProgressBar = ({ percentage }: IProgressBarProps) => {
    return (
        <StyledProgressBarShell >
            <StyledProgressBarFiller percentage={percentage} />
        </StyledProgressBarShell>
    )
}

const StyledProgressBarShell = styled.div`
    border: 1px solid grey;
    width: 100%;
`

const StyledProgressBarFiller = styled.div<{ percentage: number }>`
    height: 10px;
    background: green;
    ${(props) => `
        width: ${props.percentage}%;
    `}
`