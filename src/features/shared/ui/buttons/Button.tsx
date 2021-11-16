import { ButtonHTMLAttributes } from "react"

import styled from "@emotion/styled/macro"

import { Colors } from "../../../../styles/theme/colors/Colors"
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
    background: ${({ primary }) => (primary ? Colors.PrimaryBlue : Colors.SecondaryBlue)};
    white-space: nowrap;
    padding: 9px 6px;
    color: #fff;
    font-size: ${({ fontBig }) => (fontBig ? '16px' : '12px')};
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-ease-out;
        background: #fff;
        background: ${({ primary }) => (primary ? Colors.PrimaryBlue : Colors.SecondaryBlue)};
    }

    ${breakpoint.l} {
        padding: ${({ big }) => (big ? '12px 30px' : '12px 10px')};
        font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    }
`