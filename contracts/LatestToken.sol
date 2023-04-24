// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";


contract LatestToken is ERC20 ,Ownable,ReentrancyGuard{
    constructor() ERC20("MyLatestToken", "MLT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(18)));
    }
}
