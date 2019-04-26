import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Heading from '../components/Heading';
import { Link } from '../routes';

class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns.call();
        return {campaigns};

    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View campaign</a>
                    </Link>
                ),
                fluid: true
            };
        });

        return (
                <Card.Group items={items}/>
        );
    }

    // async componentDidMount() {
    //     const campaigns = await factory.methods.getDeployedCampaigns.call();
    //     console.log(campaigns);
    // }
    render() {
        return (
            <div>
            <Heading>
            <div>
                <h3>Open Campaigns</h3>
                <Link route='/campaigns/new'>
                    <a>
                        <Button
                            floated='right'
                            content='Create campaign'
                            icon='add circle'
                            primary={true}
                        />
                    </a>
                </Link>
                Campaign Index: {this.renderCampaigns()}
            </div>
            </Heading>
            </div>
        );
    }
}
export default CampaignIndex;