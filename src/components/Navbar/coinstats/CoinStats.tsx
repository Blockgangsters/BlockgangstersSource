import React from "react";
import { StateContext } from "../../../App";
import NumberFormat from "react-number-format";
import styled from "@emotion/styled/macro";
import { Colors } from "../../../styles/theme/colors/Colors";

export const CoinStats = () => {

    const [, gangbalance, mmConnected, mainConnected, testConnected, , inGameFunds] = React.useContext(StateContext);

    return (
        <>
            {mmConnected && mainConnected === true ? (
                <StatsContainer key="statscontainerMain">
                    <StatsItem key="gangmainBalance">
                        <NumberFormat
                            value={gangbalance}
                            displayType={"text"}
                            decimalSeparator={"."}
                            thousandSeparator={true}
                            decimalScale={0}
                            prefix={"Wallet ₲ Balance: "}
                        />
                    </StatsItem>

                    <StatsItem key="inGamemainFunds">
                        <NumberFormat
                            value={inGameFunds}
                            displayType={"text"}
                            decimalSeparator={"."}
                            thousandSeparator={true}
                            decimalScale={0}
                            prefix={"In-game ₲ Balance: "} />
                    </StatsItem>
                </StatsContainer>) : [(mmConnected && mainConnected !== true && testConnected === true ?
                    <StatsContainer key="statscontainerTest">
                        <StatsItem key="gangtestbalance">
                            <NumberFormat
                                value={gangbalance}
                                displayType={"text"}
                                decimalSeparator={"."}
                                thousandSeparator={true}
                                decimalScale={0}
                                prefix={"Wallet ₲ Balance: "}
                            />
                        </StatsItem>

                        <StatsItem key="inGametestFunds">
                            <NumberFormat
                                value={inGameFunds}
                                displayType={"text"}
                                decimalSeparator={"."}
                                thousandSeparator={true}
                                decimalScale={0}
                                prefix={"In-game ₲ Balance: "} />
                        </StatsItem>
                        <MMConnect key="TestNetMMConnect">Testnet connected</MMConnect>
                    </StatsContainer> : (mmConnected ? <MMConnect key="UnsupportedChain">Unsupported chain</MMConnect> : null))]
            }
        </>
    )
}

const StatsItem = styled.li`
    position: relative;
    padding: 7px 0px 0px 0px;
`

const StatsContainer = styled.ul`
    list-style-type: none;
    justify-content: space-between;
    color: ${Colors.White};
    font-size: 10px;
    text-align: center;
    padding-left: 0;
    align-self: center;

    @media screen and (max-width: 960px) {
        height: 120px;
        color: #fff;
        font-size: 1.2rem;
        text-align: center;
        &:hover {
            color: #4b59f7;
            transition: all 0.3s ease;
        }
    }
`

const MMConnect = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    text-decoration: none;
    padding: 4px 8px;
    height: 10px;
    width: 100%;
    border: none;
    outline: none;
    color: ${Colors.Red};
    @media screen and (max-width: 960px) {
        align-items: top;   
    }
`