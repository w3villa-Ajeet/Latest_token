# Steps to setup project :-
1. clone git repository
2. run following command for install dependencies :- npm install
3. Set Enviorment Variable
ETHERSCAN_API_KEY :- You can get it from here https://etherscan.io/apis
PRIVATE_KEY :- Your metamask wallet key with sepolia testnework eth balance
GOERLI_RPC_URL :-  Get it from https://dashboard.alchemy.com/  by creating a new project
SEPOLIA_RPC_URL :- Get it from https://dashboard.alchemy.com/  by creating a new project
REPORT_GAS=true/false 
COIN_MARKET_CAP_API_KEY :- You can get it from here https://coinmarketcap.com/ 

4. Try running some of the following tasks:
# Compile Smart Contracats:-
npm run compile

# Deploy Smart Contracts on Local(hardhat) Chain
npm run deploy-dev

# Run Test Cases on Local Enviorment 
npm run test-local

# Deploy Smart contracts on Test Chain 
npm run deploy-test
