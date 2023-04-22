// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract VotingSystem is AccessControl {
    using SafeMath for uint256;

    // Define roles for admin and voter
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant VOTER_ROLE = keccak256("VOTER_ROLE");

    // Define a struct to hold candidate information
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    // Define an array of candidates
    Candidate[] public candidates;

    // Define a mapping to keep track of voter addresses and whether they have voted
    mapping(address => bool) public voters;

    // Define events for candidate addition and vote casting
    event CandidateAdded(string name);
    event VoteCast(string candidateName);

    constructor() {
        // Assign roles to the contract creator
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);

    }

    // Define a function to add a candidate to the list of candidates
    function addCandidate(string memory _name) public onlyRole(ADMIN_ROLE) {
        candidates.push(Candidate(_name, 0));
        emit CandidateAdded(_name);
    }

    // Define a function to cast a vote for a candidate
    function vote(uint256 _candidateIndex) public onlyRole(VOTER_ROLE) {
        // Check that the voter has not already voted
        require(!voters[msg.sender], "You have already voted");

        // Check that the candidate index is valid
        require(_candidateIndex < candidates.length, "Invalid candidate index");

        // Increment the candidate's vote count
        candidates[_candidateIndex].voteCount = candidates[_candidateIndex].voteCount.add(1);

        // Mark the voter as having voted
        voters[msg.sender] = true;

        // Emit a vote cast event
        emit VoteCast(candidates[_candidateIndex].name);
    }

    // Define a function to get the total number of candidates
    function getCandidateCount() public view onlyRole(ADMIN_ROLE) returns (uint256) {
        return candidates.length;
    }

    // Define a function to get the name and vote count of a candidate
    function getCandidate(uint256 _candidateIndex) public view returns (string memory, uint256) {
        // Check that the candidate index is valid
        require(_candidateIndex < candidates.length, "Invalid candidate index");

        return (candidates[_candidateIndex].name, candidates[_candidateIndex].voteCount);
    }
}
