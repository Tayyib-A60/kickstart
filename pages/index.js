import React, {Component} from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout'
import Heading from '../components/Heading';

class CampaignIndex extends Component {

    // static async getInitialProps() {
    //     const campaigns = await factory.methods.getDeployedCampaigns.call();
    //     // return {campaigns};

    // }

    renderCampaigns() {
        // const items = this.props.campaigns.map(address => {
        //     return {
        //         header: address,
        //         description: <a>View campaign</a>,
        //         fluid: true
        //     };
        // });

        // return <Card.Group items={items}/>;
    }

    async componentDidMount() {
       
    }
    render() {
        return (
            <Heading>
            <div>
                <h3>Open Campaigns</h3>
                <Button
                    floated='right'
                    content='Create campaign'
                    icon='add circle'
                    primary={true}
                    />
                {/* Campaign Index: {this.renderCampaigns()} */}
            </div>
            </Heading>
        );
    }
}
export default CampaignIndex;