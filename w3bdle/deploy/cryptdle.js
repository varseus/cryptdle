
const hre = require("hardhat");

async function main() {
  /// Remember to compile before deploying if not using hardhat script:
  /// await hre.run('compile');

  /// Deploy:
  const Cryptdle = await hre.ethers.getContractFactory("Cryptdle");
  const cryptdle = await Cryptdle.deploy();

  await cryptdle.deployed();

  console.log("Cryptdle deployed to:", cryptdle.address);
}

/// Handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
