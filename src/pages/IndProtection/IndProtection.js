import React, {useEffect, useState }  from 'react';
import {PageWrapper, AttackPlayerContainer, Title, SubTitle} from './IndProtection.elements';
import {ColoredLine, SubmitButton} from '../../globalStyles'
import {StateContext, EthContext} from '../../App';
import {buyProtection} from '../../components/EthFunctions';
import NumberFormat from "react-number-format";

const IndProtection = () => {
    const [, , mmConnected, , , ] = React.useContext(StateContext);
    const [, , , , , , , , inGameFunds , , , , , ] = React.useContext(EthContext);

    const [amount, setAmount] = useState();

    useEffect(() => {  
        const fetchEvents = async() => {
            if (mmConnected) {


            }
        }

        fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    return (
        <PageWrapper>
                      <Title> Buy protection against attacks </Title><br />
                      <SubTitle>Tip: buy protection when you have big bags.</SubTitle>
            <AttackPlayerContainer>
              Days to buy: 
              
              <NumberFormat
        thousandsGroupStyle="thousand"
        prefix=""
        displayType="input"
        thousandSeparator={true}
        allowNegative={false}
        placeholder={"Enter days.."}
        onValueChange={({ value }) => {setAmount(value)}}
         value={amount} 
         />
              
              
              
              {amount > 0 ? <> This will cost: ₲<NumberFormat 
                value={inGameFunds/100*amount}
                displayType={"text"}
                decimalSeparator={"."}
                thousandSeparator={true}
                decimalScale={0} /> </> : null }

<SubmitButton onClick={() => { buyProtection(amount)}}> Buy protection! </SubmitButton>
                
            </AttackPlayerContainer>
            <ColoredLine color="red" />

        
        </PageWrapper>
        
    )
}

export default IndProtection
