import {CrimeContainer, Title, SubTitle} from './Admin.elements';
import React, {useEffect }  from 'react';
import {tokenAddress, getLINKBalance, transferETH, getClaimed, getVesting } from '../../components/EthFunctions';
import {ethers} from 'ethers';
import NumberFormat from "react-number-format";
import {StateContext} from '../../App';
import {ColoredLine, SubmitButton, PageWrapper} from '../../globalStyles'



const Admin = () => {

    const [, , mmConnected, , , ] = React.useContext(StateContext);
    const [linkBalance, setLinkBalance] = React.useState(0);
    const [ethBalance, setEthBalance] = React.useState(0);
    const [vested, setVested] = React.useState(0);

    useEffect(() => {  
      const fetchEvents = async() => {
        console.log("mm conn: ", mmConnected)
        if (mmConnected) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.getBalance(tokenAddress);
          //const balanceToEth = balance.div(10**18);
          console.log("MATIC in contract: ", (ethers.utils.formatEther( balance )))
          setEthBalance(ethers.utils.formatEther( balance ));
          const linkBalance = await getLINKBalance();
          setLinkBalance(linkBalance);
          const tokensVested = await getClaimed();
          setVested(ethers.utils.formatEther( tokensVested ));
        }
      }
        fetchEvents();
    }, [mmConnected]); // trigger on setTriggerEvents if we want to update every 20s

    //event tokensDeposited(address indexed sender, uint256 indexed amount);
    //event tokensWithdrawn(address indexed sender, uint256 indexed amount);

    return (
        <PageWrapper>
          <Title> Admin page </Title><br />
          <SubTitle> Available LINK in contract: <NumberFormat
            value={linkBalance}
            decimalSeparator="."
            displayType="text"
            decimalScale={3}
            type="text" />  ( or <NumberFormat
                value={linkBalance/0.0001 }
                decimalSeparator="."
                displayType="text"
                decimalScale={4}
                type="text" /> actions)     
            </SubTitle>
            <SubTitle> Available MATIC in contract: <NumberFormat
            value={ethBalance}
            decimalSeparator="."
            displayType="text"
            decimalScale={3}
            type="text" />   
            <SubmitButton onClick={() => { transferETH()}}> Withdraw! </SubmitButton> </SubTitle> 

            <SubTitle> Vested GANG tokens: <NumberFormat
            value={vested}
            decimalSeparator="."
            displayType="text"
            decimalScale={0}
            type="text" />   
            <SubmitButton onClick={() => { getVesting()}}> Use vesting! </SubmitButton> </SubTitle> 

            

            <CrimeContainer>


            

            </CrimeContainer>
            <ColoredLine color="red" />

        </PageWrapper>
        
    )
}

export default Admin
