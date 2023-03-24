const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
!developmentChains.includes(network.name) ? describe.skip : describe("W3Token", async () => {
    let w3Token, owner,acc_1,acc_2
    const chainId = network.config.chainId
    beforeEach(async () => {
        accounts = await getNamedAccounts()
        owner=accounts.owner,
        acc_1=accounts.acc_1
        acc_2=accounts.acc_2
        await deployments.fixture(["W3Token"])
        w3Token = await ethers.getContract("W3Token", owner)
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
            expect(await ethers.utils.formatEther( totalSupply ) ).to.be.equal("1000000.0");
        });

        it("should assign initial balance to owner", async () => {
            const balance = await w3Token.balanceOf(owner);
            expect(await ethers.utils.formatEther( balance )).to.be.equal("1000000.0");
        });

        it("should allow transfer of tokens", async () => {
            const amount = ethers.BigNumber.from("100000000000000000000");
            await w3Token.transfer(acc_1, amount, { from: owner });
            const balance = await w3Token.balanceOf(acc_1);
            expect(amount).to.be.equal(balance);
        });

        it("should not allow transfer to zero address", async () => {
            const amount = ethers.BigNumber.from("100000000000000000000");
            await expect(w3Token.transfer("0x0000000000000000000000000000000000000000", amount, { from: owner }))
                .to.be.rejectedWith(Error, "ERC20: transfer to the zero address");
        });

        it("should not allow transfer of more than balance", async () => {
            const amount = ethers.BigNumber.from("2000000000000000000000000");
            await expect( w3Token.transfer(acc_1, amount, { from: owner })).to.be.revertedWith("ERC20: transfer amount exceeds balance")
        });

        // it("should allow transferFrom", async () => {
        //     const amount = ethers.BigNumber.from("100000000000000000000");
        //     console.log('amount',amount)
        //     console.log('acc_1',acc_1)
        //     console.log('acc_2',acc_2)
           
        //     // Transfaring amount to acc1
        //     let tx=await w3Token.transfer(acc_1, amount, { from: owner });
        //     console.log('tx',tx)
        //     let tx2=await w3Token.connect(acc_1)
        //     // .transfer(acc_2, amount);
        //     console.log('tx2',tx2)
        //     const tx3= await w3Token.transfer(acc_2, amount, { from: acc_1 }) 
        //     console.log('tx3',tx3)
        // //    let tx1= await w3Token.approve(acc_2, amount, { from: acc_1 });
        // //    console.log('tx1',tx1)
        // // let tx=await w3Token.connect(acc_2)

        // //     await w3Token.transferFrom(acc_1, acc_2, amount, { from: acc_2 });
        //     const balance = await w3Token.balanceOf(acc_2);
        //     expect(1).to.be.equal(1);
        // });

        // it("should not allow transferFrom more than approved amount", async () => {
        //     const amount = ethers.BigNumber.from("100000000000000000000");
        //     await w3Token.approve(acc_2, amount, { from: acc_1 });
        //     await expect(w3Token.transferFrom(acc_1, acc_2, amount.muln(2), { from: acc_2 }))
        //         .to.be.rejectedWith(Error, "ERC20: transfer amount exceeds allowance");
        // });
    });

})