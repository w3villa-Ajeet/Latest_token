require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COIN_MARKET_CAP_API_KEY=process.env.COIN_MARKET_CAP_API_KEY
module.exports = {
  solidity: {
    compilers: [{ version: "0.8.18" }, { version: "0.8.7" },{version:"0.7.6"}],
    overrides: {
      "contracts/NFTAuction.sol": {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 500,
            details: { yul: false }
          },
        },
      }
    },
    
  },
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
    token: "ETH"
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockconfirmations: 1
    },
    sepolia: {
      chainId: 11155111,
      blockconfirmations: 10,
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY
    }
  },
  namedAccounts: {
    owner: 0,
    acc_1:1,
    acc_2:2,
  },
  mocha: {
    timeout: 80000000 //200 sec
  }
};