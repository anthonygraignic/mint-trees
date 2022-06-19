const { expect } = require("chai");
const { ethers, network } = require("hardhat");

// TODO migrate to TS

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

    it("Should support Royalty interface", async () => {
      const result = await mintTreeToken
        .connect(addrs[1])
        .supportsInterface(0x2a55205a);

      expect(result).to.equal(true);
    });
  });

  describe("Project A Token", function () {
    let MintTreeToken;
    let mintTreeToken;
    let ProjectAToken;
    let projectAToken;

    let deployer;
    let owner;
    let dao;
    let addrs;

    beforeEach(async function () {
      [deployer, owner, dao, ...addrs] = await ethers.getSigners();
      MintTreeToken = await ethers.getContractFactory("MintTreeToken");
      mintTreeToken = await MintTreeToken.deploy(
        "",
        owner.address,
        dao.address
      );
      await mintTreeToken.deployed();
      ProjectAToken = await ethers.getContractFactory("ProjectAToken");
      projectAToken = await ProjectAToken.deploy(
        mintTreeToken.address,
        "ipfs://",
        dao.address
      );
      await projectAToken.deployed();

      await mintTreeToken
        .connect(owner)
        .setTreeEquivalentUnitPrice(ethers.utils.parseUnits("0.01", "ether"));

      await (
        await mintTreeToken.connect(dao).addProject(projectAToken.address)
      ).wait();
    });

    it("Should swap", async function () {
      const mintTx = await mintTreeToken
        .connect(addrs[0])
        .mint(2, { value: ethers.utils.parseEther("0.02") });
      // wait until the transaction is mined
      await mintTx.wait();
      expect(await mintTreeToken.ownerOf(0)).to.equal(addrs[0].address);

      await projectAToken.connect(addrs[0]).swap(0);
      expect(await mintTreeToken.balanceOf(addrs[0].address)).to.equal(0);
    });

    it("Should not swap: not owner", async function () {
      const mintTx = await mintTreeToken
        .connect(addrs[0])
        .mint(2, { value: ethers.utils.parseEther("0.02") });
      // wait until the transaction is mined
      await mintTx.wait();
      expect(await mintTreeToken.balanceOf(addrs[0].address)).to.equal(1);

      await expect(projectAToken.connect(addrs[1]).swap(0)).to.be.revertedWith(
        "not owner of tokenId"
      );
      expect(await mintTreeToken.balanceOf(addrs[0].address)).to.equal(1);
    });
  });
});
