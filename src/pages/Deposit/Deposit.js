import React, { useEffect, useState } from 'react';

import styled from "@emotion/styled/macro";
import { ethers } from 'ethers';
import NumberFormat from "react-number-format";

import { StateContext } from '../../App';
import tokenABI from '../../components/EthABI'
import { tokenAddress, withdrawFunds, depositFunds } from '../../components/EthFunctions';
import { SubmitButton } from '../../features/shared/ui/buttons/SubmitButton';
import { ColoredLine, PageWrapper } from '../../globalStyles'

import { CrimeContainer, Title, SubTitle } from './Deposit.elements';



const Deposit = () => {
    const [inputValueDeposit, setInputValueDeposit] = React.useState();
    const [inputValueWithdraw, setInputValueWithdraw] = React.useState();

    const onChangeHandlerDeposit = event => {
        setInputValueDeposit(event);
    };

    const onChangeHandlerWithdraw = event => {
        setInputValueWithdraw(event);
    };

    const [depositEvents, setDepositEvents] = useState([]);
    const [withdrawEvents, setWithdrawEvents] = useState([]);
    const [, , mmConnected, , ,] = React.useContext(StateContext);

    useEffect(() => {
        const fetchEvents = async () => {
            console.log("mm conn: ", mmConnected)
            if (mmConnected) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
                let providerBlock = await provider.getBlockNumber();

                // deposit events
                let depositFilter = gangContract.filters.tokensDeposited(null, null) // sender, amount
                let deposit = await gangContract.queryFilter(depositFilter, providerBlock - 70000, providerBlock)

                setDepositEvents(deposit.reverse())

                // deposit events
                let withdrawFilter = gangContract.filters.tokensWithdrawn(null, null) // sender, amount
                let withdraw = await gangContract.queryFilter(withdrawFilter, providerBlock - 70000, providerBlock)

                setWithdrawEvents(withdraw.reverse())
            }
        }

        fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    //event tokensDeposited(address indexed sender, uint256 indexed amount);
    //event tokensWithdrawn(address indexed sender, uint256 indexed amount);



    return (
        <PageWrapper>
            <Title> Deposit & Withdraw your ₲ </Title><br />
            <SubTitle> Warning: only one withdrawal per week to limit safekeeping by players!</SubTitle>
            <CrimeContainer>
                Withdraw <NumberFormat
                    thousandsGroupStyle="thousand"
                    value={inputValueWithdraw}
                    prefix="₲"
                    decimalSeparator="."
                    displayType="input"
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true}
                    onValueChange={({ value }) => {
                        onChangeHandlerWithdraw(value)
                    }} />

                <SubmitButton onClick={() => { withdrawFunds(inputValueWithdraw) }}> Go for it! </SubmitButton>

            </CrimeContainer>

            <CrimeContainer>
                Deposit <NumberFormat
                    thousandsGroupStyle="thousand"
                    value={inputValueDeposit}
                    prefix="₲"
                    decimalSeparator="."
                    displayType="input"
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true}
                    onValueChange={({ value }) => {
                        onChangeHandlerDeposit(value)
                    }} />

                <SubmitButton onClick={() => { depositFunds(inputValueDeposit) }}> Go for it! </SubmitButton>

            </CrimeContainer>
            {withdrawEvents.length > 0 || depositEvents.length > 0 ?
                <ColoredLine color="red" /> : null}

            {withdrawEvents.length > 0 ?

                <>
                    <h1 style={{ color: "white" }}> Last withdrawals: </h1>
                    {withdrawEvents.map((option, index) => (
                        <h4 key={index} style={{ color: "green" }}> {option.args[0]} withdrew ₲<NumberFormat
                            value={option.args[1].toNumber()}
                            displayType={"text"}
                            decimalSeparator={"."}
                            thousandSeparator={true}
                            decimalScale={0} /></h4>
                    ))}</> : null}
            {depositEvents.length > 0 ?

                <>
                    <h1 style={{ color: "white" }}> Last deposits: </h1>
                    {depositEvents.map((option, index) => (
                        <h4 key={index} style={{ color: "green" }}> {option.args[0]} deposited ₲<NumberFormat
                            value={option.args[1].toNumber()}
                            displayType={"text"}
                            decimalSeparator={"."}
                            thousandSeparator={true}
                            decimalScale={0} /></h4>
                    ))}</> : null}
            <FillBox />
        </PageWrapper>

    )
}

export default Deposit

const FillBox = styled.div`
flex-grow: 1;
    display: flex;


`;