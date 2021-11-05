import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../../App";
import { Button } from '../../../features/shared/ui/buttons/Button';
import { connectWallet } from "../../EthFunctions";

export const MetaMaskConnect = () => {

    const [, , mmConnected, , , ,] = React.useContext(StateContext);

    const connectToWallet = () => {
        const reaction = connectWallet();
        console.log(reaction.then((data) => {
            if (data.connectedStatus === false) {
                console.log(data.status)
            }
        }))
    }

    return (
        <>
            {!mmConnected &&
                <StyledMetaMaskConnect to="/sign-up">
                    <Button primary onClick={connectToWallet}>Connect MetaMask</Button>
                </StyledMetaMaskConnect>
            }
        </>
    )
}


const StyledMetaMaskConnect = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    
`