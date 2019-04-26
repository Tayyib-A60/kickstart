import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Heading from '../../components/Heading';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        
        return {
            address: props.query.address,
            minimumContribution: summary[0]._hex,
            contractBalance: summary[1]._hex,
            numberOfRequests: summary[2]._hex,
            numberOfApprovers: summary[3]._hex,
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            minimumContribution,
            contractBalance,
            numberOfRequests,
            numberOfApprovers,
            manager
        } = this.props;
        
        const items = [
            {
                header: manager,
                meta: 'Address of the manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: parseInt(minimumContribution,16).toString(10),
                meta: 'Minimum contribution (wei)',
                description: 'You must contribute at least this much amount of wei to become an approver',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: parseInt(numberOfRequests,16).toString(10),
                meta: 'Number of requests',
                description: 'A request tries to withdraw money from the contract, Requests must be approved by approvers',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: parseInt(numberOfApprovers,16).toString(10),
                meta: 'Number of approvers',
                description: 'Number of people who have already donated to this campaign',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(contractBalance, 'ether'),
                meta: `Campaign's balance (ether)`,
                description: 'The balance is how much money the campaign has left',
                style: {overflowWrap: 'break-word'}
            }
        ];
        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Heading>
            <div>
                <h3>Campaign show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                    <a>
                                        <Button primary>View requests</Button>
                                    </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            </Heading>
        )
    }
}

export default CampaignShow;