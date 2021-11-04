import styled from "@emotion/styled/macro"
import { ButtonHTMLAttributes } from "react"
import { breakpoint } from "../../../../styles/theme/responsive/breakpoint"

interface IButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean,
    big?: boolean,
    fontBig?: boolean
}


export const Button = (props: IButtonProps) => {
    return (
        <StyledButton {...props} />
    )
}

const StyledButton = styled.button<{ primary?: boolean, big?: boolean, fontBig?: boolean }>`
    border-radius: 4px;
    background: ${({ primary }) => (primary ? '#4B59F7' : '#0467FB')};
    white-space: nowrap;
    padding: 9px 6px;
    color: #fff;
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-ease-out;
        background: #fff;
        background: ${({ primary }) => (primary ? '#0467FB' : '#4B59F7')};
    }

    ${breakpoint.m} {
        padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
    }
`