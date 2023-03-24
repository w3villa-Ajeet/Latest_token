// const { assert, expect } = require("chai")
// const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
// const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
// !developmentChains.includes(network.name) ? describe.skip : describe("W3Token", async () => {
//     let w3Token, owner
//     const chainId = network.config.chainId
//     beforeEach(async () => {
//         accounts = await getNamedAccounts()
//         owner=accounts.owner,
//         acc_1=accounts.acc_1
//         await deployments.fixture(["W3Token"])
//         w3Token = await ethers.getContract("W3Token", owner)
//     })

//     describe("W3Token", () => {
//         it("should have correct name and symbol", async () => {
//             const name = await w3Token.name();
//             const symbol = await w3Token.symbol();
//             expect(name).to.equal("w3Token");
//             expect(symbol).to.equal("W3");
//         });

//         it("should have correct total supply", async () => {
//             const totalSupply = await w3Token.totalSupply();
//             expect(totalSupply).to.be.a.bignumber.equal("1000000000000000000000000");
//         });

//         it("should assign initial balance to owner", async () => {
//             const balance = await w3Token.balanceOf(owner);
//             expect(balance).to.be.a.bignumber.equal("1000000000000000000000000");
//         });

//         it("should allow transfer of tokens", async () => {
//             const amount = web3.utils.toBN("100000000000000000000");
//             await w3Token.transfer(acc_1, amount, { from: owner });
//             const balance = await w3Token.balanceOf(acc_1);
//             expect(balance).to.be.a.bignumber.equal(amount);
//         });

//         it("should not allow transfer to zero address", async () => {
//             const amount = web3.utils.toBN("100000000000000000000");
//             await expect(w3Token.transfer("0x0000000000000000000000000000000000000000", amount, { from: owner }))
//                 .to.be.rejectedWith(Error, "ERC20: transfer to the zero address");
//         });

//         it("should not allow transfer of more than balance", async () => {
//             const amount = web3.utils.toBN("2000000000000000000000000");
//             await expect(w3Token.transfer(acc_1, amount, { from: owner }))
//                 .to.be.rejectedWith(Error, "ERC20: transfer amount exceeds balance");
//         });

//         it("should allow approve and transferFrom", async () => {
//             const amount = web3.utils.toBN("100000000000000000000");
//             await w3Token.approve(acc_2, amount, { from: acc_1 });
//             await w3Token.transferFrom(acc_1, acc_2, amount, { from: acc_2 });
//             const balance = await w3Token.balanceOf(acc_2);
//             expect(balance).to.be.a.bignumber.equal(amount);
//         });

//         it("should not allow transferFrom more than approved amount", async () => {
//             const amount = web3.utils.toBN("100000000000000000000");
//             await w3Token.approve(acc_2, amount, { from: acc_1 });
//             await expect(w3Token.transferFrom(acc_1, acc_2, amount.muln(2), { from: acc_2 }))
//                 .to.be.rejectedWith(Error, "ERC20: transfer amount exceeds allowance");
//         });
//     });

// })