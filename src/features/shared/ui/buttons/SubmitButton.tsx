import { ButtonHTMLAttributes } from "react"

import styled from "@emotion/styled/macro"

import { Colors } from "../../../../styles/theme/colors/Colors"

interface ISubmitButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean,
    big?: boolean,
    fontBig?: boolean
}
export const SubmitButton = (props: ISubmitButtonProps) => {
    return (
        <StyledSubmitButton {...props} />
    )
}

const StyledSubmitButton = styled.button`
    border-radius: 4px;
    background: ${Colors.PrimaryBlue};
    height: 38px;
    width: 150px;
    white-space: nowrap;
    padding: '10px 20px';
    color: #fff;
    font-size: '16px';
    outline: none;
    border: none;
    cursor: pointer;
    justify-self: center;

    &:hover {
        transition: all 1.0s ease-ease-out;
        background: #616189;
    }
`

