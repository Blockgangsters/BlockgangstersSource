import {ethers} from 'ethers'
import tokenABI from './EthABI'
import {tokenAddress} from './EthFunctions'


export async function getMemberFamilyIndex() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let index = await gangContract.getMemberFamilyIndex(await signer.getAddress()); // get index of the current family
  return index;
}

export async function getFamilyNames() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let names = await gangContract.getFamilyNames(); // get index of the current family
  return names;
}

export async function getFamilyOwner(index) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let owner = await gangContract.getFamilyOwner(index); // get index of the current family
  return owner;
}

export async function getFamilyRank() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let owner = await gangContract.getFamilyRank(await signer.getAddress()); // get index of the current family
  return owner;
}

export async function getFamilyBank(index) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let bank = await gangContract.getFamilyBank(index); // get index of the current family
  return bank;
}

export async function getFamilyFees(index) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let fees = await gangContract.getFamilyFees(index); // get index of the current family
  return fees;
}

export async function getAllFamilyMembers(index) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let members = await gangContract.getAllFamilyMembers(index); // get index of the current family
  return members;
}

export async function distributeFamilyBank(address, amount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.distributeFamilyBank(address, amount); // get index of the current family
}

export async function getFamilyDefBonus() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let defBonus = await gangContract.getFamilyDefBonus(await signer.getAddress()); // get index of the current family
    return defBonus;
}

export async function getFamilyAttBonus() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    let attBonus = await gangContract.getFamilyAttBonus(await signer.getAddress()); // get index of the current family
    return attBonus;
}

export async function upgradeFamilyItems(category, item) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
        const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
        await gangContract.upgradeFamilyItems(category, item); // get index of the current family
    }

export async function depositFamilyBank(amount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
        const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
        await gangContract.depositFamilyBank(amount); // get index of the current family
    }

export async function startFamily(name, EntreeFee , missionFee) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    let nameToBytes = ethers.utils.formatBytes32String ( name );
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.startFamily(nameToBytes, EntreeFee, missionFee); // get index of the current family
}

export async function organizedAttack() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.organizedAttack(); // get index of the current family
}

export async function joinOrUprankFamily(index) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    await gangContract.joinOrUprankFamily(index); // get index of the current family
}

export async function leaveFamily(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
    const gangContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    if (address === null) {
      address = signer.getAddress();
    }
    await gangContract.leaveFamily(address); // get index of the current family
}