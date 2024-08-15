// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract BalanceContract {
    function getBalance(address _address) public view returns (uint256) {
        return _address.balance;
    }
}