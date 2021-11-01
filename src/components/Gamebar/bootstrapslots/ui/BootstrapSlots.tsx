import React, { FC } from 'react';
import styled from '@emotion/styled/macro';
import AnimatedNumbers from "react-animated-numbers";
import { receiveEth } from '../../../../components/EthFunctions';
import { SubmitButton } from '../../../../globalStyles'
import Popup from 'reactjs-popup';
import NumberFormat from "react-number-format";
import { EthContext } from '../../../../App';
import { Colors } from '../../../../styles/theme/colors/Colors';


export const BootstrapSlots: FC = () => {

    const [popUp, setPopUp] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(1);

    const [, , , , , , , , , , , , , , , , , , bootstrapUsed,] = React.useContext(EthContext);

    return (
        <StyledBootstrapSlots>
            <StyledPopup open={popUp} onClose={() => setPopUp(false)} position="center center" modal closeOnDocumentClick>
                {() => (
                    <>
                        <StyledRules>
                            <StyledRulesTitle>Rules:</StyledRulesTitle>
                            <StyledRulesItem> Max 1000 MATIC per player (can be in multiple transactions).</StyledRulesItem>
                            <StyledRulesItem> Max 1000 players.</StyledRulesItem>
                            <StyledRulesItem> End date December 31, 2021.</StyledRulesItem>
                        </StyledRules>
                        <StyledAmount>Amount:</StyledAmount>
                        <NumberFormat
                            thousandsGroupStyle="thousand"
                            value={inputValue}
                            prefix="MATIC  "
                            decimalSeparator="."
                            displayType="input"
                            type="text"
                            thousandSeparator={true}
                            allowNegative={false}
                            onValueChange={({ value }) => {
                                setInputValue(parseInt(value))
                            }} />
                        <SubmitButton onClick={() => { setPopUp(false); receiveEth(inputValue.toString()) }}> Go for it! </SubmitButton>
                        <ReceiveContainer>
                            Amount to receive: ₲<NumberFormat
                                value={inputValue * 1000000}
                                displayType={"text"}
                                decimalSeparator={"."}
                                thousandSeparator={true}
                                decimalScale={0} />
                        </ReceiveContainer>
                    </>
                )}
            </StyledPopup>
            <StyledContent> Bootstrap slots available
                <CounterWrapper>
                    <BootstrapText>
                        <AnimatedNumbers
                            includeComma
                            animateToNumber={bootstrapUsed}
                            fontStyle={{ fontSize: 10, color: "white" }}
                            configs={[
                                { mass: 1, tension: 220, friction: 100 },
                                { mass: 1, tension: 180, friction: 130 },
                                { mass: 1, tension: 280, friction: 90 },
                                { mass: 1, tension: 180, friction: 135 },
                                { mass: 1, tension: 260, friction: 100 },
                                { mass: 1, tension: 210, friction: 180 },
                            ]}
                        >
                        </AnimatedNumbers>
                    </BootstrapText>
                    <BootstrapText> / 1,000 slots used</BootstrapText> <BuyButton onClick={() => { setPopUp(true) }}> Buy!</BuyButton>
                </CounterWrapper>
            </StyledContent>

        </StyledBootstrapSlots>
    )
}

const StyledBootstrapSlots = styled.div`
    display: flex;
    justify-content: center;
`

const StyledPopup = styled(Popup)`
    display: flex;
    justify-content: center;
    align-items: center;

    &-overlay {
        opacity: 1;
    }
    &-content {
        padding: 20px;
        background: ${Colors.TransparantBackground};
        width: 400px;
        height: 250px;
        border: #505064;
        border-radius: 15px;
        border-width: 5px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        display: flex;
    }
`

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 10px;
    border-radius: 15px;
    width: 100%;
    
    animation: blink 3s;
    animation-iteration-count: infinite;
    border: 1px #A27818 solid;
    @keyframes blink { 50% { border-color: #5EA022 ; }  }
`

export const StyledRules = styled.div`
    color: white;
    flex-direction: row; 
    display: inline;
    font-size: 25px;
`

export const StyledRulesTitle = styled.div`
    color: white;
    flex-direction: row; 
    list-style-type: none; 
    padding-left: 10px;
    font-size: 20px;
`

export const StyledRulesItem = styled.div`
    color: white;
    flex-direction: row; 
    list-style-type: none; 
    padding-left: 10px;
    font-size: 15px;
`

export const StyledAmount = styled.div`
    color: white;
`

export const ReceiveContainer = styled.div`
    color: white;
    font-size: 10px;
    display: flex;
    padding-left: 0.5vw;
`



export const BootstrapText = styled.span`
    color: white;
    font-size: 10px;
    display: inline-block;
    padding-left: 0.5vw;
`

export const CounterWrapper = styled.div`
    color: white;
    
    flex-direction: row; 
    display: inline;
`
export const BuyButton = styled.button`
    border-radius: 4px;
    background: #2D5A03;
    white-space: nowrap;
    padding: 1px 20px;
    color: white;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-out;
        background: #5FAA19;
    }

`