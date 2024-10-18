// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    address public admin;
    mapping(string => uint256) public votes;
    mapping(address => bool) public hasVoted;

    event VoteSubmitted(string option, uint256 totalVotes);

    constructor() {
        admin = msg.sender; // Contract owner is the admin
    }

    // Function to cast a vote
    function vote(string memory option) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        votes[option] += 1;
        hasVoted[msg.sender] = true;
        emit VoteSubmitted(option, votes[option]);
    }

    // Function to check total votes for an option
    function totalVotesFor(string memory option) public view returns (uint256) {
        return votes[option];
    }

    // Only admin can reset the votes
    function resetVotes() public {
        require(msg.sender == admin, "Only admin can reset votes.");
        // Reset logic here if needed
    }
}
