import {CrimeContainer, Title, SubTitle} from './Statistics.elements';
import React, {useEffect}  from 'react';
import {getAttackXP, getDefenseXP, getActiveList, getingameFunds} from '../../components/EthFunctions';
import {getFamilyNames} from '../../components/EthFamilyFunctions';
import {PageWrapper} from '../../globalStyles'
import NumberFormat from "react-number-format";
import {StateContext} from '../../App';

const Statistics = () => {
    const [, , mmConnected, , , ] = React.useContext(StateContext);

    const [totalAmountPlayers, setTotalAmountPlayers] = React.useState();
    const [totalIngameFunds, setTotalIngameFunds] = React.useState();


    const [totalAmountFamilies, setTotalAmountFamilies] = React.useState();
    const [totalAttackXP, setTotalAttackXP] = React.useState();
    const [totalDefenseXP, setTotalDefenseXP] = React.useState();

 

    // function getFamilyNames() external view returns (bytes32 [] memory) {
    //    function getFamilyOwner(uint indexInput) external view returns (address) {
    //     function getFamilyRank(address _user) internal view returns (uint) { // to check family bonuses (internal)
    
    
  


    useEffect(() => {  
      const fetchEvents = async() => {
        if (mmConnected) {
          let FamilyNames = await getFamilyNames();
          let playerList = await getActiveList();
          setTotalAmountFamilies(FamilyNames.length)
          let totalAtt = 0;
          let totalDef = 0; 
          let totalFunds = 0;
  
          // get list of ingamefunds per player
          for (let i = 0; i < playerList.length; i++) {
            let stringAddress = playerList[i].toString();
            let attackItem = await getAttackXP(stringAddress);
            let attackInt = attackItem.toNumber();
            totalAtt = totalAtt + attackInt;
          }
          for (let i = 0; i < playerList.length; i++) {
            let stringAddress = playerList[i].toString();
            let defenseItem = await getDefenseXP(stringAddress);
            totalDef = totalDef + defenseItem.toNumber();
          }
  
          for (let i = 0; i < playerList.length; i++) {
            let stringAddress = playerList[i].toString();
            let fundsItem = await getingameFunds(stringAddress);
            totalFunds = totalFunds + fundsItem.toNumber();
          }
  
          setTotalAmountPlayers(playerList.length);
          setTotalAttackXP(totalAtt);
          setTotalDefenseXP(totalDef);
          setTotalIngameFunds(totalFunds);
        }
      }
      fetchEvents();
  }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s



//<Input type="submit" value="Submit" />
    return (
        <PageWrapper>
          <Title> Statistics </Title><br />

            <CrimeContainer>
          {totalAmountPlayers !== 0 ? <SubTitle> Total amount of players: <NumberFormat value={totalAmountPlayers} displayType={"text"} thousandSeparator={true} /> </SubTitle> : "null" }
          {totalAmountPlayers !== 0 ? <SubTitle> Total ingame funds: <NumberFormat value={totalIngameFunds} displayType={"text"} thousandSeparator={true} prefix={"₲"} /> </SubTitle> : "null" }
          {totalAmountPlayers !== 0 ? <SubTitle> Total amount of families: <NumberFormat value={totalAmountFamilies} displayType={"text"} thousandSeparator={true} /> </SubTitle> : "null" }
          {totalAmountPlayers !== 0 ? <SubTitle> Total Attack XP obtained: <NumberFormat value={totalAttackXP} displayType={"text"} thousandSeparator={true} /> </SubTitle> : "null" }
          {totalAmountPlayers !== 0 ? <SubTitle> Total Defense XP obtained: <NumberFormat value={totalDefenseXP} displayType={"text"} thousandSeparator={true} /> </SubTitle> : "null" }

          
          

            </CrimeContainer>
           

        </PageWrapper>
        
    )
}

export default Statistics
