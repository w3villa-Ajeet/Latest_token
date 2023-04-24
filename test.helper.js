const ethers = require("ethers")

const generateTestAccounts = (number = 2) => {
  let accounts = []
  console.log(
    "*********** Generaing random accounts every time for testing ***************"
  )
  for (i = 0; i < number; i++) {
    let wallet = ethers.Wallet.createRandom()
    accounts.push(wallet.privateKey)
  }
  return accounts
}

module.exports = {
  generateTestAccounts,
}

// generateTestAccounts();
