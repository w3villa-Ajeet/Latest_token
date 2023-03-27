const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
developmentChains.includes(network.name) ? describe.skip : describe("W3Token", async () => {
    let w3Token, owner,acc_1,acc_2
    const chainId = network.config.chainId
    beforeEach(async () => {
        accounts = await getNamedAccounts()
        owner=accounts.owner,
        acc_1=accounts.acc_1
        acc_2=accounts.acc_2
        // await deployments.fixture(["W3Token"])
        w3Token = await ethers.getContract("W3Token", owner)
        console.log('w3Token found on address',w3Token.address)
    })

    describe("W3Token", () => {
        it("should have correct name and symbol", async () => {
            const name = await w3Token.name();
            const symbol = await w3Token.symbol();
            expect(name).to.equal("w3Token");
            expect(symbol).to.equal("W3");
        });

        it("should have correct total supply", async () => {
            const totalSupply = await w3Token.totalSupply();
            expect( ethers.utils.formatEther( totalSupply ) ).to.be.equal("1000000.0");
        });
        // Token Assigned only First Time Only so can run only first time 
        // it("should assign initial balance to owner", async () => {
        //     const balance = await w3Token.balanceOf(owner);
        //     console.log('ethers.utils.formatEther( balance )',ethers.utils.formatEther( balance ))
        //     expect( ethers.utils.formatEther( balance )).to.be.equal("1000000.0");
        // });

        it("should allow transfer of tokens", async () => {
            const amount =  ethers.BigNumber.from("10");
            let tx=await w3Token.transfer(acc_1, amount, { from: owner });
            await tx.wait(1)
            const balance = await w3Token.balanceOf(acc_1);
            expect(amount).to.be.equal(balance);
        });

        it("should not allow transfer to zero address", async () => {
            const amount = ethers.BigNumber.from("100000000000000000000");
            await expect(w3Token.transfer("0x0000000000000000000000000000000000000000", amount, { from: owner }))
                .to.be.rejectedWith(Error, "ERC20: transfer to the zero address");
        });
        // Will Test on Local Chain Only else
    //     it("should not allow transfer of more than balance", async () => {
    //         const amount = ethers.BigNumber.from("2000000000000000000000000");
    //         await expect( w3Token.transfer(acc_1, amount, { from: owner })).to.be.revertedWith("ERC20: transfer amount exceeds balance")
    //     });

    //     it("should allow transferFrom", async () => {
    //         const amount = ethers.BigNumber.from("200");
    //         // Transfaring amount to acc1
    //         let tx1=await w3Token.transfer(acc_1, amount, { from: owner });
    //         await tx1.wait(1)
    //         let signer= await ethers.getSigner(acc_1);
    //        let tx2= await w3Token.connect(signer).transfer(acc_2, amount) 
    //        await tx2.wait(1)
    //         const balance = await w3Token.balanceOf(acc_2);
    //         expect(balance).to.be.equal(amount);
    //     });

    //     it("should not allow transferFrom more than approved amount", async () => {
    //         const amount = ethers.BigNumber.from("100");
    //         let signer= await ethers.getSigner(acc_1);
    //         let tx1=await w3Token.connect(signer).approve(acc_2, amount);
    //         await tx1.wait(1)
    //         signer= await ethers.getSigner(acc_2)
    //        const nwAmount= ethers.BigNumber.from("105")
    //         await expect(w3Token.connect(signer).transferFrom(acc_1, acc_2, nwAmount))
    //             .to.be.rejectedWith(Error, "ERC20: insufficient allowance");
    //     });
    });

})