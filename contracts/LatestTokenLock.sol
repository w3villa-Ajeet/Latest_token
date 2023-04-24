// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./LatestToken.sol";
contract LatestTokenLock is LatestToken{
    // Events 
    event TokensLocked(uint256 amount, uint256 releaseTime,address beneficiary);
    event TokensClaimed(address beneficiary, uint256 amount);

    //Enum And Structures
    struct Lock {
        uint256 amount;
        uint256 releaseTime;
    }

    // Mappings 
    mapping(address => uint256) public beneficiaryIndex;
    mapping(address => uint256) public beneficiaryClaimed;

    // Varibles
    address public admin;
    uint256 public unlockTime;
    uint256 public lockTime;
    Lock[] public locks;

    // Constructor
    constructor(uint _time) {
        admin       = msg.sender;
        lockTime    =   _time *24*60*60; // n days into secounds
 
    }

    function lockTokens(uint256 _amount, address _beneficiary) external onlyOwner {
        require(msg.sender!=_beneficiary,'CAN_NOT_TRANSFER_TOKEN_TO_OWN');
        require(beneficiaryIndex[_beneficiary]==0,"TOKENS_ALREDY_LOCKED_FOR_THIS_USER");
        _transfer(msg.sender, address(this), _amount);
        uint256 releaseTime = block.timestamp + lockTime;
        Lock memory newData = Lock(_amount,releaseTime);
        uint index=locks.length;
           if(index==0)
        {
            locks.push(Lock(0,0));
            index=1;
        }
        locks.push(newData);
        beneficiaryIndex[_beneficiary]=index;
        emit TokensLocked(_amount,releaseTime,_beneficiary);
    }

    function claimTokens() external {
        require(beneficiaryIndex[msg.sender] >0, "BENEFICIARY_NOT_FOUND");
        uint256 index = beneficiaryIndex[msg.sender];
        require(block.timestamp >locks[index].releaseTime, "TOKENS_ARE_STILL_LOCKED");
        uint256 amount = locks[index].amount ;
        require(amount > 0, "NO_TOKENS_TO_CLAIM");
        beneficiaryClaimed[msg.sender] += amount;
        _transfer(address(this),msg.sender, amount);
        // remove from array 
        require(index < locks.length);
        locks[index] = locks[locks.length-1];
        locks.pop();
        // remove from mapping 
        delete beneficiaryIndex[msg.sender];
        emit TokensClaimed(msg.sender,amount);
    }

    function getWidrawCount() external view returns (uint256) {
        return locks.length;
    }

    function getBeneficiaryClaimedAmount(address _beneficiary) external view returns (uint256) {
        return beneficiaryClaimed[_beneficiary];
    }

    function getunlockTime() external view returns (uint256) {
        uint256 index = beneficiaryIndex[msg.sender];
        return locks[index].releaseTime;
    }
}