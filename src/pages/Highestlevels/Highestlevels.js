import {PageWrapper, CrimeContainer, Title} from './Highestlevels.elements';
import React, {useEffect }  from 'react';
import {getAttackXP, getDefenseXP, getActiveList} from '../../components/EthFunctions';

import {StateContext} from '../../App';
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










let playerList = []; // take out of const to be visible in effect
let attackXPList = []; // take out of const to be visible in effect
let defenseXPList = [];


const Highestlevels = () => {
    const [, , mmConnected, , , ] = React.useContext(StateContext);

    const [finishedFlag, setFinishedFlag] = React.useState(0);

    const [datatest, setDatatest] = React.useState([]);


    const columns = React.useMemo(
      () => [
        {
          Header: 'Address',
          accessor: 'col1', // accessor is the "key" in the data
        },
        {
          Header: 'Attack XP',
          accessor: 'col2',
        },
        {
          Header: 'Defense XP',
          accessor: 'col3', // accessor is the "key" in the data
        },
      ],
      []
    )



    useEffect(() => {  
      setDatatest([]);

      if (playerList.length !== 0) {
        playerList.forEach((row, index) => {
          setDatatest(datatest => [...datatest, {col1: playerList[index],
            col2: attackXPList[index],
            col3: defenseXPList[index]}])    
        });
      }
  }, [finishedFlag]);



    useEffect(() => { 
      
      const fetchEvents = async() => {
        if (mmConnected) {
          playerList = await getActiveList();
  
          // get list of ingamefunds per player
          for (let i = 0; i < playerList.length; i++) {
            let stringAddress = playerList[i].toString();
            let attackItem = await getAttackXP(stringAddress);
            attackXPList.push(attackItem.toNumber());
          }
          for (let i = 0; i < playerList.length; i++) {
            let stringAddress = playerList[i].toString();
            let defenseItem = await getDefenseXP(stringAddress);
            defenseXPList.push(defenseItem.toNumber());
          }
          setFinishedFlag(1);
        }
      }
        fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    // function getFamilyNames() external view returns (bytes32 [] memory) {
    //    function getFamilyOwner(uint indexInput) external view returns (address) {
    //     function getFamilyRank(address _user) internal view returns (uint) { // to check family bonuses (internal)
    
    







//<Input type="submit" value="Submit" />
    return (
        <PageWrapper>
          <Title> Highest levels </Title><br />

            <CrimeContainer>
            <Table 
        columns={columns} 
        data = {datatest}
      />

            </CrimeContainer>
           

        </PageWrapper>
        
    )
}

export default Highestlevels
