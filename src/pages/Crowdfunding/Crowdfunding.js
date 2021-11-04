import { Title, SubTitle, TitleTwo, Box, TextBox } from './Crowdfunding.elements';
import React, { useEffect } from 'react';
import { tokenAddress, crowdFundStart, crowdFundingReturn } from '../../components/EthFunctions';

import { ethers } from 'ethers';
import tokenABI from '../../components/EthABI'
import NumberFormat from "react-number-format";
import { StateContext, EthContext } from '../../App';
import { ColoredLine, PageWrapper } from '../../globalStyles'
import { SubmitButton } from '../../features/shared/ui/buttons/SubmitButton';
import Select from 'react-select'
import { useTable } from 'react-table'
import styled from 'styled-components'


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    color: white;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}







const Crowdfunding = () => {
    const [, , mmConnected, , ,] = React.useContext(StateContext);
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
        const fetchEvents = async () => {
            if (mmConnected) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
                let providerBlock = await provider.getBlockNumber();
                let crowdFundFilter = gangContract.filters.crowdFundGains(null, null) // initiator, reward
                let eventCrowdFund = await gangContract.queryFilter(crowdFundFilter, providerBlock - 70000, providerBlock)
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
    const onChangeHandler = event => {
        setAmount(event);
    };

    const columns = React.useMemo(
        () => [

            {
                Header: 'Chosen investment',
                accessor: 'chosen',
            },
            {
                Header: 'Stable returns',
                accessor: 'stable',
            },
            {
                Header: 'outperforming',
                accessor: 'outperform',
            },
            {
                Header: 'Bankruptcy',
                accessor: 'bankruptcy',
            },

        ],
        [])

    const data = React.useMemo(() =>
        [
            {
                chosen: 'Stable investment',
                stable: "90%",
                outperform: "2%",
                bankruptcy: "8%"
            },
            {
                chosen: 'Growth investment',
                stable: "60%",
                outperform: "10%",
                bankruptcy: "30%"
            },
            {
                chosen: 'Stable investment',
                stable: "0%",
                outperform: "22%",
                bankruptcy: "78%"
            },
        ], [])


    return (
        <PageWrapper>
            <Title> Crowdfunding page </Title><br />
            <TextBox>Stable investments give peace of mind while speculative investments can net explosive returns. Below table helps you make a choice! Which type of investor are you?</TextBox>
            <Styles>
                <Table columns={columns} data={data} />
            </Styles>


            {crowdfundSeconds === 0 && crowdfundClaimable !== 1 ? <> <SubTitle> Start Crowdfunding </SubTitle>

                <Select defaultValue={options[0]} options={options} onChange={onChangeHandlerChoice} styles={customStyles} />

                <NumberFormat
                    thousandsGroupStyle="thousand"
                    prefix="₲ "
                    displayType="input"
                    thousandSeparator={true}
                    allowNegative={false}
                    placeholder={"Enter amount.."}
                    onValueChange={({ value }) => { onChangeHandler(value) }}
                    value={amount}
                />
                <SubmitButton onClick={() => { setCrowdfundSeconds(600); crowdFundStart(amount, choice) }}> Go for it! </SubmitButton> </> : <SubTitle> You are already invested. </SubTitle>}



            <ColoredLine color="red" />
            <TitleTwo> Claim Crowdfunding rewards </TitleTwo>

            {crowdfundSeconds === 0 && crowdfundClaimable === 1 ? <SubmitButton onClick={() => { crowdFundingReturn() }}> Claim your rewards! </SubmitButton> : (crowdfundSeconds === 0 && crowdfundClaimable === 0 ? <SubTitle> Start a crowdfunding campaign first. </SubTitle> : <SubTitle> You have to wait {crowdfundSeconds} seconds to claim. </SubTitle>)}

            <ColoredLine color="red" />

            <SubTitle> Last rewards: </SubTitle>
            {gainsLast.map((option, index) => (
                index > 4 ? null : (option.args[1] > 0 ?

                    <Box><h4 style={{ color: "green" }}>  {option.args[0]}
                        {gainsLast[option.args[0]] !== undefined ? ethers.utils.parseBytes32String(gainsLast[option.args[0]]) : null} looted  {<NumberFormat
                            value={option.args[1].toNumber()}
                            prefix={"₲ "}
                            displayType={"text"}
                            decimalSeparator={"."}
                            thousandSeparator={true}
                            decimalScale={0} />}
                    </h4>
                    </Box>

                    :
                    <Box>
                        <h4 style={{ color: "red" }}>  {option.args[0] !== undefined ? option.args[0] : null} Failed </h4> </Box>)
            ))}
        </PageWrapper>

    )
}

export default Crowdfunding
