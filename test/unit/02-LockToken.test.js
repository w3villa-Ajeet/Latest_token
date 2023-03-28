const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
!developmentChains.includes(network.name) ? describe.skip : describe("TokenLocker", async () => {
    let lockToken, owner,acc_1,acc_2
    beforeEach(async () => {
        accounts = await getNamedAccounts()
        owner=accounts.owner,
        acc_1=accounts.acc_1
        acc_2=accounts.acc_2
        await deployments.fixture(["all"])
        lockToken = await ethers.getContract("TokenLocker", owner)
    })

    describe("TokenLocker", async() => {
    
    it('Should not transfer tokens to own address',async()=>{
        const amount = ethers.BigNumber.from("100");
        await expect(lockToken.lockTokens(amount,owner)).to.be.revertedWith("CAN_NOT_TRANSFER_TOKEN_TO_OWN");
    })
        it("should be send locktime similar", async () => {
            // Transfer 100 tokens from owner to acc_1
            const amount = ethers.BigNumber.from("100");
            await lockToken.lockTokens(amount,acc_1);
            let futureTime=parseInt(Date.now() / 1000 + 7 * 24 * 60 * 60)
            const aliceUnlockTime = await lockToken.getunlockTime();
            let unlockTime=parseInt(await aliceUnlockTime.toString())
            expect(unlockTime).to.be.lte(futureTime);
        });
        it("should not Allow User to withdraw Tokens Before Time", async () => {
            //  Transfer 100 tokens from owner to Alice
            const amount = ethers.BigNumber.from("100");
            await lockToken.balanceOf(owner)
            await lockToken.lockTokens(amount,acc_1);
            let signer= await ethers.getSigner(acc_1);
            await expect(lockToken.connect(signer).claimTokens()).to.be.revertedWith("TOKENS_ARE_STILL_LOCKED");
        });
        it('Should Allow User to withdraw tokens after Locked Time',async()=>{
            //  Transfer 100 tokens from owner to Alice
            const amount = ethers.BigNumber.from("100");
            await lockToken.balanceOf(owner)
            await lockToken.lockTokens(amount,acc_1);
            let signer= await ethers.getSigner(acc_1);
            // Wait for 7 days
            let lockTime= await lockToken.lockTime();
            // Increasing Evm Time For Withdraw Tokens
            await ethers.provider.send("evm_increaseTime", [parseInt(lockTime.toString())]);
            await ethers.provider.send("evm_mine", []);
            //Transfer unlocked tokens from contract to own account
            await lockToken.connect(signer).claimTokens()
            let acc_1Bal=await lockToken.balanceOf(acc_1)
            let conract_bal=await lockToken.balanceOf(lockToken.address)
            expect(acc_1Bal).to.equal('100');
            expect(conract_bal).to.equal('0');
        })
        it("Should Not be allow user to withdraw tokens again ",async()=>{
            const amount = ethers.BigNumber.from("100");
            let bal=await lockToken.balanceOf(owner)
            await lockToken.lockTokens(amount,acc_1);
            let signer= await ethers.getSigner(acc_1);
            await expect(lockToken.connect(signer).claimTokens()).to.be.revertedWith("TOKENS_ARE_STILL_LOCKED");
            // Wait for 7 days
            let lockTime= await lockToken.lockTime();
            // Increasing Evm Time For Withdraw Tokens
            await ethers.provider.send("evm_increaseTime", [parseInt(lockTime.toString())]);
            await ethers.provider.send("evm_mine", []);
            //Transfer unlocked tokens from contract to own account
            await lockToken.connect(signer).claimTokens()
            let acc_1Bal=await lockToken.balanceOf(acc_1)
            let conract_bal=await lockToken.balanceOf(lockToken.address)
            expect(acc_1Bal).to.equal('100');
            expect(conract_bal).to.equal('0');
            await expect(lockToken.connect(signer).claimTokens()).to.be.revertedWith("BENEFICIARY_NOT_FOUND");
        })
    });

})