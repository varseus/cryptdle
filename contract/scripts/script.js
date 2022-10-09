const hre = require("hardhat");


/// For testing
async function main() {
    const cryptdle = await hre.ethers.getContractAt("Cryptdle", "0x5fbdb2315678afecb367f032d93f642f64180aa3");
    //console.log("out:" + (await cryptdle.claim("244397417455759935995648", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).confirmations);
    //console.log("outs:" + (await cryptdle.getReward()));
    //console.log("outss:" + (await cryptdle.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")));
    //console.log("outsss:" + (await cryptdle.submitWord(1, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")));

    console.log("out:" + (await cryptdle.getHint()))
}

/// Handle errors
main().then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });

