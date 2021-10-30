import {ethers} from 'ethers'
import tokenABI from './EthABI'
export const tokenAddress = "0xD04A334584A26ED3C462B87aAb0224490fb8C956";




export async function getERCBalance(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let balance = await gangContract.balanceOf(await signer.getAddress());
    balance = ethers.utils.formatEther(balance);
  return balance;
}

export async function EthBalance(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getBalance(address)
};

export const connectWallet = async () => {
  
    if (window.ethereum) { //check if Metamask is installed
          try {
              const address = await window.ethereum.send('eth_requestAccounts'); //connect Metamask
              console.log("Succesfully connected to MetaMask");
              console.log(address)
              const obj = {
                      connectedStatus: true,
                      status: "",
                      address: address
                  }
                  console.log("conn status: ", obj["connectedStatus"])
                  return obj;
          } catch (error) {
              return {
                  connectedStatus: false,
                  status: "🦊 Connect to Metamask using the button on the top right."
              }
          }
    } else {
          return {
              connectedStatus: false,
              status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
          }
        } 
  };

export async function getingameFunds(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    if (address === undefined) {
      address = await signer.getAddress();
    }
    let balance = await gangContract.getingameFunds(address); // failing here --> when entering manually OK.
  return balance;
}

export async function attackPlayer() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
	const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
	await gangContract.attackRandomPlayerRequest();
  }

  export async function crowdFundStart(amount, choice) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.crowdFundStart(amount, choice);
    }

    export async function crowdFundingReturn() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
      await gangContract.crowdFundingReturn();
      }

      export async function buyProtection(time) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
        await gangContract.buyProtection(time);
        }
  

  export async function crime(choice) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.crimeStart(choice);
    }  

export async function Statstraining(choice) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.statsTraining(choice);
    }

export async function hireAttorney() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.hireAttorney();
    } 

  export async function getJailStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
	const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
	let jailStatus = await gangContract.getJailStatus();
	return jailStatus
} 

export async function getAttackStatus() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
	const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
	let attackStatus = await gangContract.getAttackStatus();
	return attackStatus
} 

export async function getCrowdfundStatus() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
	const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
	let crowdfundStatus = await gangContract.getCrowdfundStatus();
	return crowdfundStatus
} 

export async function getCrimeStatus() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
	const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
	let crimeStatus = await gangContract.getCrimeStatus();
	return crimeStatus
} 

  export async function getAttackXP(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
	const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
  if (address === undefined) {
    address = await signer.getAddress();
  }
	let attackLevel = await gangContract.getAttackXP(address);
	return attackLevel;
  }  

  export async function getDefenseXP(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
	const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
  if (address === undefined) {
    address = await signer.getAddress();
  }
	let defenseLevel = await gangContract.getDefenseXP(address);
	return defenseLevel;
  }  

  export async function getActiveList() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let activePlayerList = await gangContract.getActiveList();
    return activePlayerList;
    } 


  export async function depositFunds(amount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.depositFunds(amount);
  }


  export async function withdrawFunds(amount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.withdrawFunds(amount);
  }

  export async function receiveEth(amount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.receiveEth(1, {value: ethers.utils.parseEther(amount)});
  }
