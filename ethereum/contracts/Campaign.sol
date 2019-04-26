pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimumAmount) public {
       Campaign newCampaign = new Campaign(minimumAmount, msg.sender);
        deployedCampaigns.push(address(newCampaign));
    }
    
    function getDeployedCampaigns() public view returns (address[] memory){
        return deployedCampaigns;
    }
    
}

contract Campaign {
    struct Request {
        string description;
        uint amount;
        address  recipient;
        bool completed;
        uint approvalCount;
        mapping(address => bool) requestApprovals;
        
    }
    Request[] public requests;
    address public manager;
    uint public minimunContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender== manager);
        _;
    }
    constructor(uint minimum, address creator) public {
        manager = creator;
        minimunContribution = minimum;
    }
    
    function contribute() public payable  {
        require(msg.value >= minimunContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    // function createRequest(string description, uint value, address recipient)
    function createRequest(string memory description, uint value, address   recipient)
    public restricted {
        Request memory newRequest = Request({
            description:description,
            amount: value,
            recipient: recipient,
            completed: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }
    
    function approveRequest(uint requestIndex) public {
        Request storage request = requests[requestIndex];
        require(approvers[msg.sender]);
        require (!request.requestApprovals[msg.sender]);
        
        request.requestApprovals[msg.sender] = true;
        request.approvalCount++;
    
    }
    
    // function finalizeRequest(uint requestIndex) public restricted {
    function finalizeRequest(uint requestIndex)
    public restricted {
        Request storage request = requests[requestIndex];
        
        require(request.approvalCount > (approversCount/2));
        require(!request.completed);
        request.recipient.transfer(request.amount);
        
        request.completed = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimunContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}