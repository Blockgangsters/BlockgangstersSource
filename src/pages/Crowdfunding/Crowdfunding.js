import {PageWrapper, Title, SubTitle, TitleTwo, Box} from './Crowdfunding.elements';
import React, {useEffect }  from 'react';
import {tokenAddress, crowdFundStart, crowdFundingReturn} from '../../components/EthFunctions';

import {ethers} from 'ethers';
import tokenABI from '../../components/EthABI'
import NumberFormat from "react-number-format";
import {StateContext, EthContext} from '../../App';
import {ColoredLine, SubmitButton} from '../../globalStyles'
import Select from 'react-select'


const Crowdfunding = () => {
    const [, , mmConnected , , , ] = React.useContext(StateContext);
    const [, , , , , , , , , , , , , , , crowdfundSeconds, crowdfundClaimable, setCrowdfundSeconds] = React.useContext(EthContext);
    
    const options = [
      { value: '1', label: 'Stable' },
      { value: '2', label: 'Growth' },
      { value: '3', label: 'Speculative' },

    ]

    const [gainsLast, setGainsLast] = React.useState([]);





    const [choice, setChoice] = React.useState(1);
    const [amount, setAmount] = React.useState();

    const onChangeHandlerChoice = event => {
        setChoice(event.value);
      };


    useEffect(() => {  
      const fetchEvents = async() => {
        if (mmConnected) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
          let providerBlock = await provider.getBlockNumber();
          let crowdFundFilter = gangContract.filters.crowdFundGains(null, null) // initiator, reward
          let eventCrowdFund = await gangContract.queryFilter(crowdFundFilter, providerBlock-70000 , providerBlock )
          setGainsLast(eventCrowdFund.reverse())
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


    return (
        <PageWrapper>
          <Title> Crowdfunding page </Title><br />

                
                {crowdfundSeconds === 0 && crowdfundClaimable !== 1 ? <> <SubTitle> Start Crowdfunding </SubTitle>
                
                <Select defaultValue={options[0]} options={options} onChange={onChangeHandlerChoice} styles = { customStyles } />

                <input type="text" value={amount} onChange={value => setAmount(value.target.value)} /> 

                <SubmitButton onClick={() => { setCrowdfundSeconds(600); crowdFundStart(amount, choice)}}> Go for it! </SubmitButton> </> : <SubTitle> You are already invested. </SubTitle> }
  


          <ColoredLine color="red" />
          <TitleTwo> Claim Crowdfunding rewards </TitleTwo>
          
          {crowdfundSeconds === 0 && crowdfundClaimable === 1 ? <SubmitButton onClick={() => {crowdFundingReturn()}}> Claim your rewards! </SubmitButton> :  (crowdfundSeconds === 0 && crowdfundClaimable === 0 ? <SubTitle> Start a crowdfunding campaign first. </SubTitle> : <SubTitle> You have to wait {crowdfundSeconds} seconds to claim. </SubTitle>)}

          <ColoredLine color="red" />

<SubTitle> Last rewards: </SubTitle>
    {gainsLast.map((option, index) => (
        index > 4 ? null : (option.args[1] > 0 ? 
    
    <Box><h4 style={{color:"green"}}>  {option.args[0]}
    {gainsLast[option.args[0]] !== undefined ? ethers.utils.parseBytes32String(gainsLast[option.args[0]]) : null } looted  { <NumberFormat 
    value={option.args[1].toNumber()}
    prefix={"₲ "}
    displayType={"text"}
    decimalSeparator={"."}
    thousandSeparator={true}
    decimalScale={0} /> }
     </h4>
     </Box>
    
    :
    <Box>
    <h4 style={{color:"red"}}>  {option.args[0] !== undefined ? option.args[0] : null } Failed </h4> </Box>)
    ))}
        </PageWrapper>
        
    )
}

export default Crowdfunding
