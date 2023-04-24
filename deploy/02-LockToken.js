const { network } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utills/verify")
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { owner } = await getNamedAccounts()
  const MyLatestToken = await ethers.getContract("LatestToken", owner)
  const args = [7]
  const token = await deploy("LatestTokenLock", {
    from: owner,
    args,
    log: true,
    waitconfirmations: network.config.blockconfirmations,
  })
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("verifying contract On chain wait a minute...")

    await verify(
      "contracts/LatestTokenLock.sol:LatestTokenLock",
      token.address,
      args
    )
  }
  log("************************ Script Ended *************************")
}

module.exports.tags = ["all", "LatestTokenLock"]
