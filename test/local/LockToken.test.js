const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
!developmentChains.includes(network.name) ? describe.skip : describe("LockTokan", async () => {
    let lockToken, owner,acc_1,acc_2
    beforeEach(async () => {
        accounts = await getNamedAccounts()
        owner=accounts.owner,
        acc_1=accounts.acc_1
        acc_2=accounts.acc_2
        await deployments.fixture(["LockTokan"])
        lockToken = await ethers.getContract("LockTokan", owner)
    })

    describe("LockTokan", async() => {
        it("should be send locktime similar", async () => {
            // Transfer 100 tokens from owner to Alice
            const amount = ethers.BigNumber.from("100");
            await lockToken.transfer(acc_1,amount);
            // Check that Alice's tokens are locked
            const aliceUnlockTime = await lockToken.unlockTime(acc_1);
            let unlockTime=parseInt(await aliceUnlockTime.toString())
            let futureTime=parseInt(Date.now() / 1000 + 7 * 24 * 60 * 60)
            expect(unlockTime).to.be.equal(futureTime);
        });
        it("should unlock token after 7 days", async () => {
            // Transfer 100 tokens from owner to Alice
            const amount = ethers.BigNumber.from("100");
            await lockToken.transfer(acc_1,amount);
            // Check that Alice's tokens are locked
            const aliceUnlockTime = await lockToken.unlockTime(acc_1);
          let signer= await ethers.getSigner(acc_1);
            await expect(lockToken.connect(signer).transfer(acc_2,amount)).to.be.revertedWith("LockableToken: sender tokens are locked");
        
            // // Wait for 7 days
            await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
            await ethers.provider.send("evm_mine", []);
    
            // Transfer unlocked tokens from Alice to Bob
            await lockToken.connect(signer).transfer(acc_2,amount)
            let acc_1Bal=await lockToken.balanceOf(acc_1)
            let acc_2Bal=await lockToken.balanceOf(acc_2)
            console.log(acc_1Bal.toString())
            console.log(acc_2Bal.toString())
            expect(acc_1Bal).to.equal('0');
            expect(acc_2Bal).to.equal('100');
        });
    });

})