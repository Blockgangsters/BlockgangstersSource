import {PageWrapper, CrimeContainer, Title, Img} from './Crime.elements';
import React, {useEffect, useState }  from 'react';
import {tokenAddress , crime} from '../../components/EthFunctions';
import {ethers} from 'ethers';
import tokenABI from '../../components/EthABI'
import NumberFormat from "react-number-format";
import {StateContext, EthContext} from '../../App';
import {ColoredLine, SubmitButton} from '../../globalStyles'
import Select from 'react-select'
import missions from './missions.PNG';

const Crime = () => {
    const [, , mmConnected, , , ] = React.useContext(StateContext);
    const [, , , , , , , , , , jailSeconds, , , crimeSeconds] = React.useContext(EthContext);
    
    const options = [
        { value: '1', label: 'Petty crime' },
        { value: '2', label: 'Break into a villa' },
        { value: '3', label: 'Armed robbery' },
        { value: '4', label: 'Hack a company and ask for ransom' },
        { value: '5', label: 'Hijack a private jet' }
      ]
    

    const [inputValue, setInputValue] = React.useState(options[0].value);

    const onChangeHandler = event => {
      setInputValue(event.value);
    };


    const [events, setEvents] = useState([]);
    useEffect(() => {  
      const fetchEvents = async() => {
        if (mmConnected) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
          let providerBlock = await provider.getBlockNumber();
  
          // attack events
          let crimeFilter = gangContract.filters.crimeResult(null, null, null) // success, loot, stamp
          let events = await gangContract.queryFilter(crimeFilter, providerBlock-70000 , providerBlock )
          setEvents(events.reverse())
          console.log(events)
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
          <Title> Crime </Title><br />
            <CrimeContainer>
            {jailSeconds === 0 && crimeSeconds === 0 ?
                <Select defaultValue={options[0]} options={options} onChange={onChangeHandler} styles = { customStyles } /> : null } 

            {jailSeconds !== 0 || crimeSeconds !== 0 ? "You are not ready yet!" : <SubmitButton onClick={() => { crime(inputValue)}}> Go for it! </SubmitButton>}
          
            </CrimeContainer>
           

            <ColoredLine color="red" />
            <Img src={missions} alt="Girl in a jacket" width="754" height="432" />

            <h1 style={{color:"white"}}> Last crimes: </h1>
                {events.map((option, index) => (
                    index > 2 ? null : (option.args[0] === true ? 
                <h4 style={{color:"green"}}> index {index} -- A loot of: ₲<NumberFormat 
                value={option.args[1].toNumber()}
                displayType={"text"}
                decimalSeparator={"."}
                thousandSeparator={true}
                decimalScale={0} /></h4> :
                <h4 style={{color:"red"}}> Index {index} -- Failed </h4>)
                ))}
        </PageWrapper>
        
    )
}

export default Crime
