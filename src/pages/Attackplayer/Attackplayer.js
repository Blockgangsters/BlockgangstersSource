import React, { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import NumberFormat from "react-number-format";

import { StateContext, EthContext } from '../../App';
import tokenABI from '../../components/EthABI'
import { tokenAddress, attackPlayer, hireAttorney } from '../../components/EthFunctions';
import { SubmitButton } from '../../features/shared/ui/buttons/SubmitButton';
import { ColoredLine, PageWrapper } from '../../globalStyles'

import { AttackPlayerContainer, Title, SubTitle, AttackDoubleContainer } from './Attackplayer.elements';

const Attackplayer = () => {
    const [, , mmConnected, , ,] = React.useContext(StateContext);
    const [, , , , , , , , , , jailSeconds, attorneySeconds, attackSeconds,] = React.useContext(EthContext);

    const [events, setEvents] = useState([]);
    const [lastAttacker, setLastAttacker] = useState();
    const [lastLoot, setLastLoot] = useState();
    const [lastResult, setLastResult] = useState();

    useEffect(() => {
        const fetchEvents = async () => {
            if (mmConnected) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
                let providerBlock = await provider.getBlockNumber();

                let attackFilter = gangContract.filters.playerAttacked(null, null, null, null, null)
                let attackMeFilter = gangContract.filters.playerAttacked(null, null, ethers.utils.getAddress(window.ethereum.selectedAddress), null, null)
                let events = await gangContract.queryFilter(attackFilter, providerBlock - 70000, providerBlock)
                let eventsMe = await gangContract.queryFilter(attackMeFilter, providerBlock - 70000, providerBlock)
                let lastEventsMe = eventsMe.reverse();

                if (lastEventsMe.length !== 0) {
                    setLastAttacker(lastEventsMe[0].args[1]);
                    setLastLoot(lastEventsMe[0].args[3].toNumber());
                    setLastResult(lastEventsMe[0].args[0]);
                }
                setEvents(events.reverse())
            }
        }

        fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    return (
        <PageWrapper>
            <SubTitle>Tip: train your attack for a higher chance of success!</SubTitle>

            <AttackDoubleContainer>

                <AttackPlayerContainer>
                    <Title> Attack random player </Title><br />

                    {attackSeconds === 0 && jailSeconds === 0 ? <SubmitButton onClick={() => { attackPlayer("0x000000000000000000000000000000000000dEaD") }}> Attack player</SubmitButton> : null}
                    {jailSeconds > 0 && attorneySeconds === 0 ? <SubmitButton onClick={() => { hireAttorney() }}> Hire attorney</SubmitButton> : null}


                </AttackPlayerContainer>

                <AttackPlayerContainer>
                    <Title> Revenge yourself! </Title><br />
                    {lastResult === true ? <>{lastAttacker} stole ₲<NumberFormat
                        value={lastLoot}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={0} /> </> : "the last attacker failed!"}
                    {attackSeconds === 0 && jailSeconds === 0 ? (lastResult === true ? <SubmitButton onClick={() => { attackPlayer("1234") }}> Take revenge </SubmitButton> :
                        <SubmitButton onClick={() => { attackPlayer("1234") }}> Further Humiliation! </SubmitButton>) : null}
                    {jailSeconds > 0 && attorneySeconds === 0 ? <SubmitButton onClick={() => { hireAttorney() }}> Hire attorney</SubmitButton> : null}


                </AttackPlayerContainer>
            </AttackDoubleContainer>
            <ColoredLine color="red" />
            <h1 style={{ color: "white" }}> Last attacks: </h1>
            {events.map((option, index) => (
                index > 2 ? null : (option.args[0] === true ?
                    <h4 key={index} style={{ color: "green" }}> index {index} -- {option.args[1]} attacked {option.args[2]} for a loot of: ₲<NumberFormat
                        value={option.args[3].toNumber()}
                        displayType={"text"}
                        decimalSeparator={"."}
                        thousandSeparator={true}
                        decimalScale={0} /></h4> :
                    <h4 style={{ color: "red" }}> index {index} --  {option.args[1]} failed to attack {option.args[2]} costing: ₲ <NumberFormat
                        value={option.args[3].toNumber()}
                        displayType={"text"}
                        decimalSeparator={"."}
                        thousandSeparator={true}
                        decimalScale={0} /></h4>)
            ))}

        </PageWrapper>

    )
}

export default Attackplayer
