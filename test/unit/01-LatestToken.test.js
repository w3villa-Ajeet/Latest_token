const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config")
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("LatestToken Local Test Case", async () => {
      let LatestToken, owner, acc_1, acc_2
      const chainId = network.config.chainId
      beforeEach(async () => {
        accounts = await getNamedAccounts()
        ;(owner = accounts.owner), (acc_1 = accounts.acc_1)
        acc_2 = accounts.acc_2
        await deployments.fixture(["all"])
        LatestToken = await ethers.getContract("LatestToken", owner)
      })

      describe("LatestToken", () => {
        it("should have correct name and symbol", async () => {
          const name = await LatestToken.name()
          const symbol = await LatestToken.symbol()
          console.log("name", name)
          console.log("symbol", symbol)
          expect(name).to.equal("MyLatestToken")
          expect(symbol).to.equal("MLT")
          console.log("testcases passed+++++++++++++++++++++")
        })

        it("should have correct total supply", async () => {
          const totalSupply = await LatestToken.totalSupply()
          expect(await ethers.utils.formatEther(totalSupply)).to.be.equal(
            "1000000.0"
          )
        })

        it("should assign initial balance to owner", async () => {
          const balance = await LatestToken.balanceOf(owner)
          expect(await ethers.utils.formatEther(balance)).to.be.equal(
            "1000000.0"
          )
        })

        it("should allow transfer of tokens", async () => {
          const amount = ethers.BigNumber.from("100000000000000000000")
          await LatestToken.transfer(acc_1, amount, { from: owner })
          const balance = await LatestToken.balanceOf(acc_1)
          expect(amount).to.be.equal(balance)
        })

        it("should not allow transfer to zero address", async () => {
          const amount = ethers.BigNumber.from("100000000000000000000")
          await expect(
            LatestToken.transfer(
              "0x0000000000000000000000000000000000000000",
              amount,
              { from: owner }
            )
          ).to.be.rejectedWith(Error, "ERC20: transfer to the zero address")
        })

        it("should not allow transfer of more than balance", async () => {
          const amount = ethers.BigNumber.from("2000000000000000000000000")
          await expect(
            LatestToken.transfer(acc_1, amount, { from: owner })
          ).to.be.revertedWith("ERC20: transfer amount exceeds balance")
        })

        it("should allow transferFrom", async () => {
          const amount = ethers.BigNumber.from("100000000000000000000")
          // Transfaring amount to acc1
          await LatestToken.transfer(acc_1, amount, { from: owner })
          let signer = await ethers.getSigner(acc_1)
          await LatestToken.connect(signer).transfer(acc_2, amount)
          const balance = await LatestToken.balanceOf(acc_2)
          expect(balance).to.be.equal(amount)
        })

        it("should not allow transferFrom more than approved amount", async () => {
          const amount = ethers.BigNumber.from("1000")
          let signer = await ethers.getSigner(acc_1)
          await LatestToken.connect(signer).approve(acc_2, amount)
          signer = await ethers.getSigner(acc_2)
          const nwAmount = ethers.BigNumber.from("1005")
          await expect(
            LatestToken.connect(signer).transferFrom(acc_1, acc_2, nwAmount)
          ).to.be.rejectedWith(Error, "ERC20: insufficient allowance")
        })
      })
    })
