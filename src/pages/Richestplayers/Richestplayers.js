import {PageWrapper, CrimeContainer, Title} from './Richestplayers.elements';
import React, {useEffect }  from 'react';
import {getActiveList, getingameFunds} from '../../components/EthFunctions';

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
let ingameFundList = []; // take out of const to be visible in effect

const Richestplayers = () => {
    const [, , mmConnected, , , ] = React.useContext(StateContext);

    const [finishedFlag, setFinishedFlag] = React.useState(0);
    const [, ] = React.useState(0);

    const [datatest, setDatatest] = React.useState([]);

    const columns = React.useMemo(
      () => [
        {
          Header: 'Address',
          accessor: 'col1', // accessor is the "key" in the data
        },
        {
          Header: 'Ingame Funds',
          accessor: 'col3', // accessor is the "key" in the data
        },
      ],
      []
    )

    useEffect(() => {  
      setDatatest([]);
      if (playerList.length !== 0) { 
        console.log("in effect")
        console.log("Player list is: ", playerList)
        playerList.forEach((row, index) => {
          console.log("in effect, this row: ", row)
          setDatatest(datatest => [...datatest, {col1: playerList[index],
            col3: ingameFundList[index]}])    
        });
      }
  }, [finishedFlag]);

    useEffect(() => {  
      const fetchEvents = async() => {
        if (mmConnected) {
          playerList = await getActiveList();
          for (let i = 0; i < playerList.length; i++) {
            let stringAddress = playerList[i].toString();
            console.log("String: ", stringAddress)
            let fundItem = await getingameFunds(stringAddress);
            ingameFundList.push(fundItem.toNumber());
          }
          setFinishedFlag(1);

        }
      }
      fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    return (
        <PageWrapper>
          <Title> Richest players </Title><br />

            <CrimeContainer>
            <Table 
        columns={columns} 
        data = {datatest}
      />
            </CrimeContainer>
        </PageWrapper>
        
    )
}

export default Richestplayers
