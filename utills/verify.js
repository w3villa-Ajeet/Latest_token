const { run } = require("hardhat")
const verify = async (name,contractAddress, args) => {
    try {
        await run("verify:verify",
            {
                contract:name,
                address: contractAddress,
                constructorArguments: args
            })
    }
    catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        }
        else {
            console.error("Some Error Occurs when verifying conatract on chain ....",error)
        }
    }
}


module.exports = {
    verify
}