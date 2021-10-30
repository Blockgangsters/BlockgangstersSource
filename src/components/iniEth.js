async function getChainId() {
    const provider = await detectEthereumProvider();
    // ----- this will give us the ID of the current chain ---
    const chainId = await provider.request({method: "eth_chainId", params: []})
    console.log("Chain id: ", chainId)
    if (chainId === "0x1") {
        console.log("Mainnet detected")
        return true
    } else {
        console.log("Please switch to mainnet")
        return false
    }
    //--------------------------------------------------------

    // -----this will prompt to switch the network to index 0x1 (mainnet)
    //await provider.request({
    //    method: 'wallet_switchEthereumChain',
    //    params: [{ chainId: '0x1' }],
    //  });
    //---------------------------------------------------------
  }