import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../../App";
import { Button } from '../../../features/shared/ui/buttons/Button';
import { connectWallet } from "../../EthFunctions";

export const MetaMaskConnect = () => {

    const [button, setButton] = useState(true);

    const [, , mmConnected, , , ,] = React.useContext(StateContext);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    useEffect(() => {
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            {button && !mmConnected ?
                <NavItemBtn key="signup"><NavBtnLink to="/sign-up">
                    <Button primary onClick={() => {
                        const reaction = connectWallet();
                        console.log(reaction.then((data) => {
                            if (data.connectedStatus === false) {
                                console.log(data.status)
                            }
                        }))
                    }}>Connect MetaMask</Button>
                </NavBtnLink>
                </NavItemBtn> :
                (!button && !mmConnected
                    ?
                    <NavItemBtn key="signupmobile"><NavBtnLink to="/sign-up">
                        <Button onClick={() => {
                            const reaction = connectWallet();
                            console.log(reaction.then((data) => {
                                if (data.connectedStatus === false) {
                                    console.log(data.status)
                                }
                            }))
                        }}>Connect MetaMask</Button>
                    </NavBtnLink>
                    </NavItemBtn>
                    : null)
            }
        </>
    )
}

const NavItemBtn = styled.li`
    @media screen and (max-width: 960px) {
        display: flex;
        justify-content: left;
        align-items: left;
        width: 300px;
        height: 120px;
    }
`

const NavBtnLink = styled(Link)`
    display: flex;
    justify-content: left;
    align-items: center;
    text-decoration: none;
    padding: 8px 16px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
`
