import React, {useEffect, useState }  from 'react';
import {PageWrapper, AttackPlayerContainer, Title, SubTitle} from './Attackplayer.elements';
import {ColoredLine, SubmitButton} from '../../globalStyles'
import {StateContext, EthContext} from '../../App';
import {tokenAddress, attackPlayer, hireAttorney} from '../../components/EthFunctions';
import {ethers} from 'ethers';
import tokenABI from '../../components/EthABI'
import NumberFormat from "react-number-format";

const Attackplayer = () => {
    const [, , mmConnected, , , ] = React.useContext(StateContext);
    const [, , , , , , , , , , jailSeconds, attorneySeconds, attackSeconds, ] = React.useContext(EthContext);

    const [events, setEvents] = useState([]);

    useEffect(() => {  
        const fetchEvents = async() => {
            if (mmConnected) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            let providerBlock = await provider.getBlockNumber();
    
            let attackFilter = gangContract.filters.playerAttacked(null, null, null, null)
            let events = await gangContract.queryFilter(attackFilter, providerBlock-70000 , providerBlock )
            setEvents(events.reverse())
            }
        }

        fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    return (
        <PageWrapper>
                      <Title> Attack another random player </Title><br />
                      <SubTitle>Tip: train your attack for a higher chance of success!</SubTitle>
            <AttackPlayerContainer>
              {attackSeconds === 0 && jailSeconds === 0 ? <SubmitButton onClick={() => { attackPlayer()}}> Attack player</SubmitButton>: null }
              {jailSeconds > 0 && attorneySeconds === 0 ? <SubmitButton onClick={() => { hireAttorney()}}> Hire attorney</SubmitButton> : null}

                
            </AttackPlayerContainer>
            <ColoredLine color="red" />
            <h1 style={{color:"white"}}> Last attacks: </h1>
                {events.map((option, index) => (
                    index > 2 ? null : (option.args[0] === true ? 
                <h4 style={{color:"green"}}> index {index} -- {option.args[1]} attacked {option.args[2]} for a loot of: ₲<NumberFormat 
                value={option.args[3].toNumber()}
                displayType={"text"}
                decimalSeparator={"."}
                thousandSeparator={true}
                decimalScale={0} /></h4> :
                <h4 style={{color:"red"}}> index {index} --  {option.args[1]} failed to attack {option.args[2]} costing: ₲ <NumberFormat 
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
