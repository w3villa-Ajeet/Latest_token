const { run } = require("hardhat")
const verify = async (name,contractAddress, args) => {
    try {
        console.log('name',name)
        console.log('contractAddress',contractAddress)
        console.log('args',args)
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