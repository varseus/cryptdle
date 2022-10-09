const { expect } = require("chai");
const { ethers } = require("hardhat");

/// Sample test to get hint
/// @dev write tests
describe("Cryptdle", function () {
  it("Should return the new word once it's changed", async function () {
    const Cryptdle = await ethers.getContractFactory("Cryptdle");
    const cryptdle = await Cryptdle.deploy(62400);
    await cryptdle.deployed();

    expect(await cryptdle.getHint()).to.equal("244397417455759935995648");

    // wait until the transaction is mined
    await setNewWord.wait();

    expect(await cryptdle.getHint()).to.equal("244397417455759935995648");
  });
});
