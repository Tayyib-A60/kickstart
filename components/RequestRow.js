import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
    approveRequest = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
    }

    finalizeRequest = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
    }

    render() {
        const { Cell, Row } = Table;
        const { id, request, approversCount } = this.props;
        const noOfApprovers = parseInt(approversCount._hex,16).toString(10);
        const readyToFinalize = request.approvalCount > noOfApprovers/2;
        
        const amount = web3.utils.fromWei(parseInt(request.amount._hex,16).toString(10), 'ether');
        const approvalCount = parseInt(request.approvalCount._hex,16).toString(10);
        return (
            <Row disabled={request.completed} positive={readyToFinalize && !request.completed}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{amount}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{approvalCount}/{noOfApprovers}</Cell>
                <Cell>
                    {request.completed ? null : (
                        <Button color='green' basic onClick={this.approveRequest}>Approve</Button>
                    )}
                </Cell>
                <Cell>
                    {request.completed ? null : (
                        <Button color='blue' basic onClick={this.finalizeRequest}>Finalize</Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;

