import {CrimeContainer, Title, ItemContainer} from './Attackfamily.elements';
import React, {useEffect, useState }  from 'react';
import {tokenAddress} from '../../components/EthFunctions';
import {ethers} from 'ethers';
import tokenABI from '../../components/EthABI'
import NumberFormat from "react-number-format";
import {StateContext} from '../../App';
import {ColoredLine, SubmitButton, PageWrapper} from '../../globalStyles'
import {getFamilyNames, organizedAttack} from '../../components/EthFamilyFunctions';

const Attackfamily = () => {
    const [, , mmConnected, , , ] = React.useContext(StateContext);
    
    const [attackEvent, setAttackEvent] = useState([]);
    const [familyNamesState, setFamilyNamesState] = useState([]);

    useEffect(() => {  
      const fetchEvents = async() => {
        if (mmConnected) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
          let providerBlock = await provider.getBlockNumber();
  
          // attack events
          let familyAttackFilter = gangContract.filters.organizedAttackResult(null, null, null) // familyindex, fam att bonus, fam def bonus
          console.log(familyAttackFilter)
          let event = await gangContract.queryFilter(familyAttackFilter, providerBlock-70000 , providerBlock )
          setAttackEvent(event.reverse())
          let FamilyNames = await getFamilyNames();
          setFamilyNamesState(FamilyNames);
        }
      }
        fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s



    return (
        <PageWrapper>
             <CrimeContainer> <br />
                <Title> Attack another random family </Title>
           
                <ItemContainer>
            <SubmitButton onClick={() => { organizedAttack()}}> Attack family!</SubmitButton>
                </ItemContainer>
                </CrimeContainer>                

            <ColoredLine color="red" />

            <h1 style={{color:"white"}}> Last attacks: </h1>
                {attackEvent.map((option, index) => (
                    index > 4 ? null : (option.args[1] === true ? 
                
                <h4 style={{color:"green"}}>  
                {familyNamesState[option.args[0].toNumber() -1] !== undefined ? ethers.utils.parseBytes32String(familyNamesState[option.args[0].toNumber() -1]) : null } looted  { <NumberFormat 
                value={option.args[2].toString()}
                prefix={"₲ "}
                displayType={"text"}
                decimalSeparator={"."}
                thousandSeparator={true}
                decimalScale={0} /> }
                 </h4>
                
                
                :
                <h4 style={{color:"red"}}> {familyNamesState[option.args[0].toNumber() -1] !== undefined ? ethers.utils.parseBytes32String(familyNamesState[option.args[0].toNumber() -1]) : null } Failed </h4>)
                ))}
        </PageWrapper>
        
    )
}

export default Attackfamily
