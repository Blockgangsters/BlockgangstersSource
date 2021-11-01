import {PageWrapper, CrimeContainer, Title, SubTitle, ItemContainer} from './Familyshop.elements';
import React, {useEffect, useState }  from 'react';
import {tokenAddress} from '../../components/EthFunctions';
import {ethers} from 'ethers';
import tokenABI from '../../components/EthABI'
import NumberFormat from "react-number-format";
import {StateContext} from '../../App';
import {ColoredLine, SubmitButton} from '../../globalStyles'
import Select from 'react-select'
import {upgradeFamilyItems, depositFamilyBank, getFamilyNames} from '../../components/EthFamilyFunctions';

const Familyshop = () => {
    const [, , mmConnected, , , ] = React.useContext(StateContext);
    
    const optionsAttack = [
        { value: '1', label: 'Brass knuckles' },
        { value: '2', label: 'Hand gun' },
        { value: '3', label: 'Uzi' },
        { value: '4', label: 'AK47' }
      ]
    
    const optionsDefense = [
        { value: '1', label: 'Police vest' },
        { value: '2', label: 'Military vest' },
      ]

    const [inputValueAtt, setInputValueAttack] = React.useState(optionsAttack[0].value);
    const [inputValueDef, setInputValueDefense] = React.useState(optionsDefense[0].value);
    const [inputValueDeposit, setInputValueDeposit] = React.useState();

    const onChangeHandlerAttack = event => {
      setInputValueAttack(event.value);
    };


    const onChangeHandlerDefense = event => {
        setInputValueDefense(event.value);
    };

    const onChangeHandlerDeposit = event => {
        setInputValueDeposit(event);
    };

    const [eventsDeposit, setEventsDeposit] = useState([]);
    const [familyNamesState, setFamilyNamesState] = useState([]);
    useEffect(() => {  
      const fetchEvents = async() => {
        if (mmConnected) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
          let providerBlock = await provider.getBlockNumber();
  
  
          let familyDepositsFilter = gangContract.filters.fundsDeposited(null, null, null) // familyindex, sender, amount
          let eventsDeposit = await gangContract.queryFilter(familyDepositsFilter, providerBlock-70000 , providerBlock )
          setEventsDeposit(eventsDeposit.reverse())
  
          let FamilyNames = await getFamilyNames();
          setFamilyNamesState(FamilyNames);
        }
      }
        fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s



    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '2px dotted blue',
        color: state.isSelected ? 'white' : 'black',
        backgroundColor: state.isSelected ? 'blue' : 'white',
        "&:hover": {
          backgroundColor: "lightgrey"
        }
      }),
      control: (provided) => ({
        ...provided,
        marginTop: "",
      }),
      container: base => ({
        ...base,
        flex: 1
      })
    }


//<Input type="submit" value="Submit" />
    return (
        <PageWrapper>
             <CrimeContainer> <br />
                <Title> Donate to family </Title>
           
                <ItemContainer>
             <NumberFormat placeholder={"enter amount.."} onValueChange={({ value }) => {onChangeHandlerDeposit(value)}} value={inputValueDeposit} displayType={"input"} thousandSeparator={true} mask="Test" prefix={"₲ "} /> 
            <SubmitButton onClick={() => { depositFamilyBank(inputValueDeposit)}}> Donate to family!</SubmitButton>
                </ItemContainer>
                </CrimeContainer>                
                
                <CrimeContainer>
                <Title> Upgrade family items </Title> 
                <SubTitle> Note: select manually next upgrade. Contract will revert if not selected next upgrade. UI update will fix this asap.</SubTitle>
                <ItemContainer>
                <Select defaultValue={optionsAttack[0]} options={optionsAttack} onChange={onChangeHandlerAttack} styles = { customStyles } /> 
                <SubmitButton onClick={() => { upgradeFamilyItems(1, inputValueAtt)}}> Upgrade attack! </SubmitButton>
                </ItemContainer>
<br />
                <ItemContainer>
                <Select defaultValue={optionsDefense[0]} options={optionsDefense} onChange={onChangeHandlerDefense} styles = { customStyles } />
                <SubmitButton onClick={() => { upgradeFamilyItems(2, inputValueDef)}}> Upgrade defense! </SubmitButton>
                </ItemContainer>


            </CrimeContainer>

            
            <ColoredLine color="red" />

            <h1 style={{color:"white"}}> Last deposits: </h1>
                {eventsDeposit.map((option, index) => (
                    index > 2 ? null :  
                <h4 style={{color:"green"}}>{familyNamesState[option.args[0].toNumber() -1] !== undefined ? ethers.utils.parseBytes32String(familyNamesState[option.args[0].toNumber() -1]) : null } got donated <NumberFormat 
                value={option.args[2].toString()}
                prefix={"₲ "}
                displayType={"text"}
                decimalSeparator={"."}
                thousandSeparator={true}
                decimalScale={0} /> by player {option.args[1].toString()}.</h4>
                ))}
        </PageWrapper>
        
    )
}

export default Familyshop
