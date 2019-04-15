import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x57e5a686b3EAdF963EAd492fFA8c06e68F4123ad'
);
// web3.eth.defaultAccount = web3.eth.accounts[0];
// personal.unlockAccount(web3.eth.defaultAccount);
export default instance;