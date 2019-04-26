import React, { Component } from 'react'
import Heading from '../../../components/Heading';
import { Form, Button, Message, Input} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';


class RequestNew extends Component {

    state = {
        value: '',
        description: '',
        recipient: '',
        errorMessage: '',
        loading: false
    };
    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    CreateRequest = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        const { description, value, recipient} = this.state;
        this.setState({ loading: true, errorMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
            .send({
                from: accounts[0]
            });
            Router.replaceRoute(`/campaigns/${this.props.address/requests}`);
        } catch (error) {
            this.setState({errorMessage: error.message});
        }
        this.setState({ loading: false});
    };

    render() {
        return (
            <Heading>
            <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>Back</a>
            </Link>
            <h3>Create a new request</h3>
            <Form onSubmit={this.CreateRequest} error={!!this.state.errorMessage}>
                <Form.Field>
                <label>Description</label>
                <Input 
                    value={this.state.description}
                    onChange={event => this.setState({ description: event.target.value})}
                />
                </Form.Field>
                <Form.Field>
                <label>Value in ether</label>
                <Input 
                    value={this.state.value}
                    onChange={event => this.setState({ value: event.target.value})}
                />
                </Form.Field>
                <Form.Field>
                <label>Recipient</label>
                <Input 
                    value={this.state.recipient}
                    onChange={event => this.setState({ recipient: event.target.value})}
                />
                </Form.Field>
                <Message error header='Oops!!!' content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>Create</Button>
            </Form>
            </Heading>
        );
    }
}

export default RequestNew;