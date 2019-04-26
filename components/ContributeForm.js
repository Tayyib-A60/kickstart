import React, { Component } from 'react';
import {Form, Button, Input, Message } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {

    state = {
        myContribution: '',
        errorMessage: '',
        loading: false
    };

    contribute = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        this.setState({ loading: true});
        this.setState({ errorMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.myContribution, 'ether')
            });
            Router.replaceRoute('/campaigns/', this.props.address);
        } catch (error) {
            this.setState({errorMessage: error.message});
        }
        this.setState({ loading: false, myContribution: ''});
    }

    render() {
        return (
            <div>
            <Form onSubmit={this.contribute} error={!!this.state.errorMessage}>
                <Form.Field>
                <label>Amount to contribute</label>
                <Input 
                    label="ether"
                    labelPosition='right'
                    value={this.state.myContribution}
                    onChange={event => this.setState({ myContribution: event.target.value})}
                    />
                </Form.Field>
                <Message error header='oops!!!' content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>Contribute</Button>
            </Form>
            </div>
        );
    }
}

export default ContributeForm;