const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
developmentChains.includes(network.name) ? describe.skip : describe("LockToken", async () => {
    let lockToken, owner,acc_1,acc_2
    beforeEach(async () => {
        accounts = await getNamedAccounts()
        owner=accounts.owner,
        acc_1=accounts.acc_1
        acc_2=accounts.acc_2
        lockToken = await ethers.getContract("LockToken", owner)
    })

    describe("LockToken", async() => {
        it("should be send locktime similar", async () => {
            // Transfer 100 tokens from owner to Alice
            const amount = ethers.BigNumber.from("100");
            let tx=await lockToken.transfer(acc_1,amount);
            await tx.wait(1);
            // Check that Alice's tokens are locked
            const aliceUnlockTime = await lockToken.unlockTime(acc_1);
            let unlockTime=parseInt(aliceUnlockTime.toString())
            let futureTime=parseInt(Date.now() / 1000 + 7 * 24 * 60 * 60)
            expect(unlockTime).to.be.lte(futureTime);
        });
    });

})