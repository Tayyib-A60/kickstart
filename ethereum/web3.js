import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metaMask is running
    web3 = new Web3(window.web3.currentProvider);
    // web3.eth.defaultAccount = web3.eth.accounts[0];
    // console.log(web3.eth.defaultAccount);
    
    // personal.unlockAccount(web3.eth.defaultAccount);
} else {
    // We are in the server OR the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/223ce873863647efaf8dcb6d00cf3605'
    );
    web3 = new Web3(provider);
}

export default web3;