import React, { Component } from 'react';
import {Form, Button, Input, Message } from 'semantic-ui-react'
import Heading from '../../components/Heading';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minumumContribution: '',
        errorMessage: '',
        loading: false
    };

    createCampaign = async event => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        console.log('Entering create campaign');
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            

            await factory.methods.createCampaign(this.state.minumumContribution).send({
                from: accounts[0]
            });
            Router.pushRoute('/')
        } catch(err) {
            this.setState({ errorMessage: err.message });
            console.log(err);
        }  
        this.setState({ loading: false });
    }
    render () {
        return (
            <Heading>
            <h3>Create a new campaign!</h3>
            <Form onSubmit={this.createCampaign} error={!!this.state.errorMessage}>
                <Form.Field>
                <label>Minimum Contribution</label>
                <Input 
                    label="wei"
                    labelPosition='right'
                    value={this.state.minumumContribution}
                    onChange={event => this.setState({minumumContribution: event.target.value})}
                    />
                </Form.Field>
                <Message error header='oops!!!' content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>Create!</Button>
            </Form>
            </Heading>
        );
    }
};
export default CampaignNew;