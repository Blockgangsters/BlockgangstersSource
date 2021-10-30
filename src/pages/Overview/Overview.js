import {PageWrapper, CrimeContainer, Title, SubTitle, LeaveButton, JoinButton} from './Overview.elements';
import React, {useEffect}  from 'react';
import {getMemberFamilyIndex, getFamilyNames, getFamilyOwner, getAllFamilyMembers, getFamilyBank, getFamilyFees, joinOrUprankFamily, leaveFamily} from '../../components/EthFamilyFunctions';

import {ethers} from 'ethers';
import {StateContext} from '../../App';
import {ColoredLine} from '../../globalStyles'
import { useTable, useSortBy  } from "react-table";



function Table({columns, data}){


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

return (


<table {...getTableProps()} style={{ border: 'solid 2px white' }}>
<thead>
{headerGroups.map(headerGroup => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
          <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              style={{
                borderBottom: 'solid 2px white',
                color: 'white',
              }}
          >
            {column.render('Header')}
            <span>
              {column.isSorted
                  ? column.isSortedDesc
                      ? '🔽'
                      : '🔼'
                  : '🔽'}
           </span>
          </th>
      ))}
    </tr>
))}
</thead>
<tbody {...getTableBodyProps()}>
{rows.map(row => {
  prepareRow(row)
  return (
      <tr {...row.getRowProps()}>
        {row.cells.map(cell => {
          return (
              <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                  }}
              >
                {cell.render('Cell')}
              </td>
          )
        })}
      </tr>
  )
})}
</tbody>
</table>

)}



const Overview = () => {
    const [, , mmConnected, , , ] = React.useContext(StateContext);
    const [amountMembers, setAmountMembers] = React.useState([])
    const [familyNamesString, setFamilyNamesString] = React.useState([])
    //const [finishedFlag, setFinishedFlag] = React.useState(0);
    const [datatest, setDatatest] = React.useState([]);
    const [myFamilyName, setMyFamilyName] = React.useState("");
    const [amountFamilies, setAmountFamilies] = React.useState();

    const [familyOwner, setFamilyOwner] = React.useState();

    const [familyBank, setFamilyBank] = React.useState([]);
    const [familyEntreeFee, setFamilyEntreeFee] = React.useState([]);
    const [familyMissionFee, setFamilyMissionFee] = React.useState([]);

    const columns = React.useMemo(
      () => [
        {
          Header: 'Family',
          accessor: 'col1', // accessor is the "key" in the data
        },
        {
          Header: 'Amount of members',
          accessor: 'col3', // accessor is the "key" in the data
        },
        {
          Header: 'Entree Fee',
          accessor: 'col4', // accessor is the "key" in the data
        },
        {
          Header: 'Mission Fee',
          accessor: 'col5', // accessor is the "key" in the data
        },
        {
          Header: 'Family bank',
          accessor: 'col6', // accessor is the "key" in the data
        },
        {
          Header: 'Family index',
          accessor: 'col7', // accessor is the "key" in the data
        },   
        {     
          Header: "Join family",
          Cell: ({ cell }) => (
            <JoinButton onClick={() => { joinOrUprankFamily(cell.row.values.col7)}}> Join {cell.row.values.col7}
            </JoinButton>
          )
        }
      ],
      []
    )

    




    useEffect(() => {  
      setDatatest([]);
      if (amountMembers.length !== 0) {

      amountMembers.forEach((row, index) => {

        setDatatest(datatest => [...datatest, {col1: familyNamesString[index],
          col3: amountMembers[index],
          col4: familyEntreeFee[index],
          col5: familyMissionFee[index],
          col6: familyBank[index],   
          col7: index +1}])
      });
    }
  }, [familyNamesString, amountMembers, familyEntreeFee, familyMissionFee, familyBank ]);



    useEffect(() => { 
      const fetchEvents = async() => {
        if (mmConnected) {    
          let familyId = await getMemberFamilyIndex();
          let familyIdNumber = familyId.toNumber();
  
          let familyOwner = await getFamilyOwner(familyIdNumber); 
          setFamilyOwner(familyOwner)
          let FamilyNames = await getFamilyNames(); 
          if (familyIdNumber !== 0) {
            let myFamilyName = ethers.utils.parseBytes32String(FamilyNames[familyId - 1]);
            setMyFamilyName(myFamilyName)
          }


  
          setAmountFamilies(FamilyNames.length)
          for (let i = 0; i < FamilyNames.length; i++) {
            let allMembers = await getAllFamilyMembers(i+1);
            let familyFees = await getFamilyFees(i+1);
            let entreeFee = familyFees[0].toNumber();
            let missionFee = familyFees[1].toNumber();
            setFamilyEntreeFee(familyEntreeFee => [...familyEntreeFee, entreeFee]);
            setFamilyMissionFee(familyMissionFee => [...familyMissionFee, missionFee]);
            
            let bankEntree = await getFamilyBank(i+1);
            setFamilyBank(familyBank => [...familyBank, bankEntree.toNumber()]);

            setFamilyNamesString(familyNamesString => [...familyNamesString, ethers.utils.parseBytes32String(FamilyNames[i])]);
            setAmountMembers(amountMembers => [...amountMembers, allMembers.length]);
          }
          //setFinishedFlag(1);
        }
      }
      fetchEvents();

    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    return (
        <PageWrapper>
          <Title> Family ranking </Title><br />
          <SubTitle> Current Family: {familyOwner === "0x0000000000000000000000000000000000000000" ? "Not in a family" : <> {myFamilyName} <LeaveButton onClick={() => { leaveFamily()}}> Leave family </LeaveButton></>}</SubTitle>
          <SubTitle> Amount of families: {amountFamilies}</SubTitle>

          <ColoredLine color="red" />

      <CrimeContainer>
        <Table 
          columns={columns} 
          data = {datatest}
        />
      </CrimeContainer>
        </PageWrapper> 
    )
}

export default Overview
