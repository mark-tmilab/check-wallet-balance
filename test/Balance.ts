import { expect } from "chai";
import { ethers } from "hardhat";
import { BalanceContract } from "../typechain-types";

describe("BalanceContract", function () {
  let balanceContract: BalanceContract;
  let owner: any;
  let addr1: any;

  beforeEach(async function () {
    const BalanceContractFactory = await ethers.getContractFactory(
      "BalanceContract"
    );

    balanceContract =
      // @ts-ignore
      (await BalanceContractFactory.deploy()) as BalanceContract;

    [owner, addr1] = await ethers.getSigners();
  });

  it("should return the correct balance of the address", async function () {
    const ownerInitialBalance = await balanceContract.getBalance(owner.address);
    const expectedBalance = await ethers.provider.getBalance(owner.address);
    expect(ownerInitialBalance).to.equal(expectedBalance);

    const addr1InitialBalance = await balanceContract.getBalance(addr1.address);
    const expectedAddr1Balance = await ethers.provider.getBalance(
      addr1.address
    );
    expect(addr1InitialBalance).to.equal(expectedAddr1Balance);
    expect(addr1InitialBalance).to.equal(ethers.parseEther("10000"));
  });

  it("should update balance after a transaction", async function () {
    await owner.sendTransaction({
      to: addr1.address,
      value: ethers.parseEther("1.0"),
    });

    const addr1NewBalance = await balanceContract.getBalance(addr1.address);
    const expectedNewBalance = await ethers.provider.getBalance(addr1.address);
    expect(addr1NewBalance).to.equal(expectedNewBalance);
    expect(addr1NewBalance).to.equal(ethers.parseEther("10001"));
  });
});
