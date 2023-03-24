// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract W3Token is ERC20 ,Ownable,ReentrancyGuard{
    constructor() ERC20("w3Token", "W3") {
        _mint(msg.sender, 1000000 * (10 ** uint256(18)));
    }
}
