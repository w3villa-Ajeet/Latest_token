//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LockToken {
    mapping (address => uint256) public balances;
    mapping (address => uint256) public lockTimes;

    function transfer(address _to, uint256 _value) public {
        require(balances[msg.sender] >= _value, "Insufficient balance.");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        lockTimes[_to] = block.timestamp + 7 days; // Lock tokens for 7 days
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function canWithdraw(address _owner) public view returns (bool) {
        return block.timestamp >= lockTimes[_owner];
    }

    function withdraw() public {
        require(canWithdraw(msg.sender), "Tokens are still locked.");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
