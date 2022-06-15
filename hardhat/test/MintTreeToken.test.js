const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("Deployment & Owner", function () {
  let MintTreeToken;
  let mintTreeToken;
  let deployer;
  let owner;
  let dao;
  let addrs;

  beforeEach(async function () {
    [deployer, owner, dao, ...addrs] = await ethers.getSigners();
    MintTreeToken = await ethers.getContractFactory("MintTreeToken");
    mintTreeToken = await MintTreeToken.deploy("", owner.address, dao.address);
    await mintTreeToken.deployed();
  });

  it("Should have the right owner", async function () {
    expect(await mintTreeToken.owner()).to.equal(owner.address);
  });
  it("Should get Royalty Info", async () => {
    const result = await mintTreeToken.connect(addrs[0]).royaltyInfo(1, 10000);

    expect(result[0]).to.equal(dao.address);
    expect(result[1].toNumber()).to.equal(500);
  });
  it("Should set DAO", async () => {
    await mintTreeToken.connect(owner).setDao(addrs[1].address);

    const result = await mintTreeToken.connect(addrs[1]).royaltyInfo(1, 10000);

    expect(result[0]).to.equal(addrs[1].address);
    expect(result[1].toNumber()).to.equal(500);
  });
  it("Should not set DAO: not owner", async () => {
    await expect(
      mintTreeToken.connect(addrs[1]).setDao(addrs[2].address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
  it("Should set Royalty Info address ZERO", async () => {
    await mintTreeToken.connect(owner).setDao(ethers.constants.AddressZero);

    const result = await mintTreeToken.connect(addrs[1]).royaltyInfo(1, 10000);

    expect(result[0]).to.equal(owner.address);
    expect(result[1].toNumber()).to.equal(500);
  });

  it("Should support Royalty interface", async () => {
    const result = await mintTreeToken
      .connect(addrs[1])
      .supportsInterface(0x2a55205a);

    expect(result).to.equal(true);
  });

  it("Should set tree equivalent unit price", async () => {
    await mintTreeToken
      .connect(owner)
      .setTreeEquivalentUnitPrice(ethers.utils.parseUnits("0.01", "ether"));

    const price = await mintTreeToken
      .connect(addrs[1])
      .treeEquivalentUnitPrice();

    expect(price).to.equal("10000000000000000");
  });
});

describe("Mint Trees", function () {
  let MintTreeToken;
  let mintTreeToken;
  let deployer;
  let owner;
  let dao;
  let addrs;

  beforeEach(async function () {
    [deployer, owner, dao, ...addrs] = await ethers.getSigners();
    MintTreeToken = await ethers.getContractFactory("MintTreeToken");
    mintTreeToken = await MintTreeToken.deploy("", owner.address, dao.address);
    await mintTreeToken.deployed();

    await mintTreeToken
      .connect(owner)
      .setTreeEquivalentUnitPrice(ethers.utils.parseUnits("0.01", "ether"));
  });

  it("Should mint", async function () {
    const mintTx = await mintTreeToken
      .connect(addrs[0])
      .mint(2, { value: ethers.utils.parseEther("0.02") });
    // wait until the transaction is mined
    await mintTx.wait();

    expect(await mintTreeToken.balanceOf(addrs[0].address)).to.equal(1);
  });
});
