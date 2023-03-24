const networkConfig = {
    5: {
        name: 'goerli'
    },
    11155111:{
        name:'sepolia'
    },
    31337: {
        name: 'hardhat'
    }
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    developmentChains, networkConfig
}