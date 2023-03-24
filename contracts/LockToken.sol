// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LockTokan is ERC20 {
    struct Lock {
        uint256 amount;
        uint256 unlockTime;
    }

    mapping(address => Lock) private locks;
    address owner;

     constructor() ERC20("LockToken", "Loken") {
        owner=msg.sender;
        _mint(msg.sender, 1000000 * (10 ** uint256(18)));
    }
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
    if(msg.sender!=owner)
    {
        require(unlockTime(msg.sender) <= block.timestamp, "LockableToken: sender tokens are locked");
    }
        _transfer(_msgSender(), recipient, amount);
        locks[recipient] = Lock(amount, block.timestamp + 7 days);
        return true;
    }

    function unlockTime(address account) public view returns (uint256) {
        return locks[account].unlockTime;
    }
}
