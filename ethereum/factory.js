import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x8436485b61a4ce78c6e0590cee6ee6b32e2734d8'
);
// web3.eth.defaultAccount = web3.eth.accounts[0];
// personal.unlockAccount(web3.eth.defaultAccount);
export default instance;