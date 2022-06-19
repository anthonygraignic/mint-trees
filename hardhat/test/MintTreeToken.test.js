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

    const price = await mintTreeToken.unitPrice();

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

  it("Should mint: above price", async function () {
    const mintTx = await mintTreeToken
      .connect(addrs[0])
      .mint(1, { value: ethers.utils.parseEther("0.2") });
    // wait until the transaction is mined
    await mintTx.wait();

    expect(await mintTreeToken.balanceOf(addrs[0].address)).to.equal(1);
  });

  it("Should not mint: below price", async function () {
    const mintTx = await mintTreeToken
      .connect(addrs[0])
      .mint(2, { value: ethers.utils.parseEther("0.02") });
    // wait until the transaction is mined
    await mintTx.wait();

    expect(await mintTreeToken.balanceOf(addrs[0].address)).to.equal(1);
    await expect(
      mintTreeToken
        .connect(addrs[0])
        .mint(2000, { value: ethers.utils.parseEther("0.02") })
    ).to.be.revertedWith("Mint trees: below price");
  });

  it("Should add project", async function () {
    const projectContractAddress = "0xDef1C0ded9bec7F1a1670819833240f027b25EfF";
    const receipt = await (
      await mintTreeToken.connect(dao).addProject(projectContractAddress)
    ).wait();

    const projectAdded = receipt.events?.find(
      (e) => e.event === "ProjectAdded"
    );
    expect(projectAdded?.args?.project).to.equal(projectContractAddress);
    expect(
      await mintTreeToken.availableProjects(projectContractAddress)
    ).to.equal(true);
    expect(
      await mintTreeToken.isApprovedForAll(
        addrs[1].address,
        projectContractAddress
      )
    );
  });

  it("Should not add project: not DAO", async function () {
    await expect(
      mintTreeToken
        .connect(addrs[0])
        .addProject("0xDef1C0ded9bec7F1a1670819833240f027b25EfF")
    ).to.be.revertedWith("Mint trees: caller is not the DAO");
  });

  it("Should remove project", async function () {
    const projectContractAddress = "0xDef1C0ded9bec7F1a1670819833240f027b25EfF";
    const receipt = await (
      await mintTreeToken.connect(dao).removeProject(projectContractAddress)
    ).wait();

    const projectRemoved = receipt.events?.find(
      (e) => e.event === "ProjectRemoved"
    );
    expect(projectRemoved?.args?.project).to.equal(projectContractAddress);
    expect(
      await mintTreeToken.availableProjects(projectContractAddress)
    ).to.equal(false);
  });
  it("Should not remove project: not DAO", async function () {
    await expect(
      mintTreeToken
        .connect(addrs[0])
        .removeProject("0xDef1C0ded9bec7F1a1670819833240f027b25EfF")
    ).to.be.revertedWith("Mint trees: caller is not the DAO");
  });
});
