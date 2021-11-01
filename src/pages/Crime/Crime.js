import {PageWrapper, CrimeContainer, Title, ChartContainer, SubTitle, SelectContainer} from './Crime.elements';
import React, {useEffect, useState }  from 'react';
import {tokenAddress , crime} from '../../components/EthFunctions';
import {ethers} from 'ethers';
import tokenABI from '../../components/EthABI'
import NumberFormat from "react-number-format";
import {StateContext, EthContext} from '../../App';
import {ColoredLine, SubmitButton} from '../../globalStyles'
import Select from 'react-select'
import { BarChart, Text, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Crime = () => {
    const [, , mmConnected, , , ] = React.useContext(StateContext);
    const [, , attackState , , , , , , , , jailSeconds, , , crimeSeconds] = React.useContext(EthContext);

    const options = [
        { value: '1', label: 'Petty crime' },
        { value: '2', label: 'Break into a villa' },
        { value: '3', label: 'Armed robbery' },
        { value: '4', label: 'Hack a company and ask for ransom' },
        { value: '5', label: 'Hijack a private jet' }
      ]
    

    const [inputValue, setInputValue] = React.useState(options[0].value);
    const [pettyChance, setPettyChance] = React.useState(0);
    const [villaChance, setVillaChance] = React.useState(0);
    const [robChance, setRobChance] = React.useState(0);
    const [hackChance, setHackChance] = React.useState(0);
    const [hijackChance, setHijackChance] = React.useState(0);

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
          let crimeFilter = gangContract.filters.crimeResult(window.ethereum.selectedAddress, null, null, null) // success, loot, stamp
          let events = await gangContract.queryFilter(crimeFilter, providerBlock-70000 , providerBlock )
          setEvents(events.reverse())
          console.log("Events are: ", events)
        }
      }
        fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    useEffect(() => {  
      const setChances = async() => {
        if (mmConnected) {

          setPettyChance(1.2 - 0.8*2**-((attackState/1000000/20)) >1 ? 1 : 1.2 - 0.8*2**-((attackState/1000000/20)) );
          setVillaChance(1.1 - 0.8*2**-((attackState/1000000/30))> 1 ? 1 : 1.1 - 0.8*2**-((attackState/1000000/30)));
          setRobChance(1.1 - 0.8*2**-((attackState/1000000-15)/40) > 1 ? 1 : 1.1 - 0.8*2**-((attackState/1000000-15)/40));
          setHackChance(1.1 - 0.8*2**-((attackState/1000000-35)/40));
          setHijackChance(1.1 - 0.8*2**-((attackState/1000000-55)/35));
          //setOptionsState([...optionsState,
           //  {value: "1", label: pettyChance},
           //  {value: "2", label: villaChance},
           //  {value: "3", label: robChance},
           //  {value: "4", label: hackChance},
           //  {value: "5", label: hijackChance},
           //])
        }
      }
        setChances();
      }, [attackState, mmConnected]);

      const data = [
        {
          name: 'Petty',
          value: pettyChance*100,
        },
        {
          name: 'Villa',
          value: villaChance*100,
        },
        {
          name: 'Robbery',
          value: robChance*100,
        },
        {
          name: 'Hacking',
          value: hackChance*100,
        },
        {
          name: 'Hijacking',
          value: hijackChance*100,
        }

      ]

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

    const CustomizedLabelB = ({ kapi, metric, viewBox }) => {
      return (
          <Text
              x={0}
              y={0}
              fill='white'
              dx={-150}
              dy={30}
              textAnchor="start"
              width={180}
              transform="rotate(-90)"
          >            
              Success rate (%)
          </Text>
      );
  };

  


    return (
        <PageWrapper>
          <Title> Crime </Title><br />
            <CrimeContainer>

<ChartContainer>
<SubTitle> Your chance of success </SubTitle><br />
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis  label={<CustomizedLabelB />} />
          <Tooltip />
          <Bar dataKey="value" fill="#2C3D83" />
        </BarChart>
        </ChartContainer>


         <SelectContainer>   {jailSeconds === 0 && crimeSeconds === 0 ?
                <Select defaultValue={options[0]} options={options} onChange={onChangeHandler} styles = { customStyles } /> : null } 

            {jailSeconds !== 0 || crimeSeconds !== 0 ? "You are not ready yet!" : <SubmitButton onClick={() => { crime(inputValue)}}> Go for it! </SubmitButton>}
          </SelectContainer>
            </CrimeContainer>

            <ColoredLine color="red" />
          




            <h1 style={{color:"white"}}> Your last crimes: </h1>
                {events.map((option, index) => (
                    index > 2 ? null : (option.args[1] === true ? 
                      
                <h4 style={{color:"green"}}> 
                {Math.floor((Date.now()/1000-option.args[3].toNumber())/3600) > 0 ? <> {Math.floor((Date.now()/1000-option.args[3].toNumber())/3600)} hours ago </>: "In the last hour "}
                you looted ₲<NumberFormat 
                value={option.args[2].toNumber()}
                displayType={"text"}
                decimalSeparator={"."}
                thousandSeparator={true}
                decimalScale={0} /> </h4>  : 
                <h4 style={{color:"red"}}> 
                {Math.floor((Date.now()/1000-option.args[3].toNumber())/3600) > 0 ? <> {Math.floor((Date.now()/1000-option.args[3].toNumber())/3600)} hours ago </>: "In the last hour "}

                you failed.. </h4>)
                ))}
        </PageWrapper>
        
    )
}

export default Crime
