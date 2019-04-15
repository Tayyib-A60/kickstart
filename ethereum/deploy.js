const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
// const accountPneumonic = 'half few poem mix weasel dice small infant fury tribe forum lounge';
// const deployLink = 'rinkeby.infura.io/v3/223ce873863647efaf8dcb6d00cf3605';
const provider = new HDWalletProvider(
    'half few poem mix weasel dice small infant fury tribe forum lounge',
    'rinkeby.infura.io/v3/223ce873863647efaf8dcb6d00cf3605'
);
const web3 = new Web3(provider);
// const ganache = require('ganache-cli');
// const Web31 = require('web3');
// const web31 =  new Web3(ganache.provider());
let accounts;

const deploy = async () => {
    
    accounts = await web3.eth.getAccounts();
    console.log('Accounts', accounts);
        console.log('Attempting to deploy from ', accounts[0]);
        
        const result = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0]});

        console.log('Contact deployed to', result.options.address);
};
deploy();