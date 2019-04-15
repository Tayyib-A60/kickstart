const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 =  new Web3(ganache.provider());
// accounts = await web3.eth.getAccounts();

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let campaignFactory;
let campaign;
let campaignAddress;
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        

        campaignFactory = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: 1000000 });
        
        await campaignFactory.methods.createCampaign('100')
        .send({ from: accounts[0], gas: 1000000});
        
        [campaignAddress] = await campaignFactory.methods.getDeployedCampaigns()
        .call();
        // campaign = await new web3.eth.Contract(
        //                     JSON.parse(compiledCampaign.interface,
        //                     campaignAddress));
        campaign = await new web3.eth.Contract(
            JSON.parse(compiledCampaign.interface))
            .deploy({ data: compiledCampaign.bytecode, arguments: ['100', accounts[0]] })
        .send({ from: accounts[0], gas: 1000000 });
    });

    describe('Campaigns', () => {
        it('deploys a campign factory and a campaign', () => {
            assert.ok(campaignFactory.options.address);
            assert.ok(campaignAddress);
            assert.ok(campaign.options.address);
        });

        it('marks caller of createCampaign as the campaign manager', async() => {
            const manager = await campaign.methods.manager().call();
            assert.equal(accounts[0], manager);
        });
        it('allows people to become contributors and marks them as one', async() => {
            await campaign.methods.contribute().send({
                value: 200,
                from: accounts[1]
            });
            const isContributor = await campaign.methods.approvers(accounts[1]).call();
            assert(isContributor);
        });
        it('requires a minimum contribution', async() => {
            try{
                await campaign.methods.contribute().send({
                from: accounts[0],
                value: 20
                });
                assert(false);
            } catch (err) {
                assert(err);
            }
        });
        it('allows a manager to make a payment request', async() => {
            await campaign.methods.createRequest('Buy something', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
            const request = await campaign.methods.requests(0).call();
            assert.equal('Buy something', request.description);
        });
        it('process requests', async() => {
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei('10', 'ether')
            });
            await campaign.methods.createRequest(
                'Buy another thing',
                web3.utils.toWei('5', 'ether'),
                accounts[2]).send({
                    from: accounts[0],
                    gas: '1000000'
                });
            await campaign.methods.approveRequest(0).send({
                from: accounts[0],
                gas: '1000000'
            });
            let previousVendorBalance = await web3.eth.getBalance(accounts[2]);
            previousVendorBalance = web3.utils.fromWei(previousVendorBalance, 'ether');
            console.log(previousVendorBalance);
            
            await campaign.methods.finalizeRequest(0).send({
                from: accounts[0],
                gas: '1000000'
            });
            let vendorBalance = await web3.eth.getBalance(accounts[2]);
            vendorBalance = web3.utils.fromWei(vendorBalance, 'ether');
            vendorBalance = parseFloat(vendorBalance);
            console.log(vendorBalance);
            assert(vendorBalance > 104)
        });
    });