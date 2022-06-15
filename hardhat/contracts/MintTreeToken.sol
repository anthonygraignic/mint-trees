// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title MintTreeToken
/// @author Anthony Graignic (@agraignic)
/// @notice NFT contract for Mint Trees
contract MintTreeToken is
    ERC721,
    ERC721Enumerable,
    Ownable,
    EIP712,
    ERC721Votes
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public treeEquivalentUnitPrice;
    /// @notice DAO address
    address public dao;

    /// @dev Contract URI used by OpenSea to get contract details (owner, royalties...)
    string public contractURI;

    constructor(
        string memory _contractURI,
        address _owner,
        address _dao
    ) ERC721("MintTreeToken", "M3T") EIP712("MintTreeToken", "1") {
        contractURI = _contractURI;
        if (_owner != address(0)) {
            _transferOwnership(_owner);
        }
        if (_dao != address(0)) {
            dao = _dao;
        }
    }

    modifier mininalPrice(uint256 quantity) {
        require(
            msg.value >= treeEquivalentUnitPrice * quantity,
            "Mint trees: below price"
        );
        _;
    }

    modifier onlyDao(uint256 quantity) {
        require(msg.sender == dao, "Mint trees: caller is not the DAO");
        _;
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "ipfs://bafybeibumtkc5dn2gubon3qy3by22kh5zsita3o5xzgwwk73imks367cva/";
    }

    /// @notice mint a tree
    function mint(uint256 trees) external payable mininalPrice(trees) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId);
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Votes) {
        super._afterTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return
            interfaceId == this.royaltyInfo.selector ||
            super.supportsInterface(interfaceId);
    }

    ////////////////////////////////////////////////////
    ///// Royalties                                   //
    ////////////////////////////////////////////////////

    /// @dev Royalties are the same for every token that's why we don't use OZ's impl.
    function royaltyInfo(uint256, uint256 amount)
        public
        view
        returns (address, uint256)
    {
        address recipient = dao;
        if (recipient == address(0)) {
            recipient = owner();
        }

        // (royaltiesRecipient || owner), 5%
        return (recipient, (amount * 500) / 10000);
    }

    ////////////////////////////////////////////////////
    ///// Only Owner                                  //
    ////////////////////////////////////////////////////

    /// @notice Allow owner to update tree equivalent unit price
    /// @param newUnitPrice new unit price
    function setTreeEquivalentUnitPrice(uint256 newUnitPrice)
        external
        onlyOwner
    {
        treeEquivalentUnitPrice = newUnitPrice;
    }

    /// @notice Allow owner to set the DAO address
    /// @param newDaoAddress the new contract address
    function setDao(address newDaoAddress) external onlyOwner {
        dao = newDaoAddress;
    }

    /// @notice Allow owner to set contract URI
    /// @param newContractURI the new contract URI
    function setContractURI(string calldata newContractURI) external onlyOwner {
        contractURI = newContractURI;
    }

    /// @notice Allow everyone to withdraw contract balance and send it to owner
    function withdraw() external {
        payable(dao).transfer(address(this).balance);
    }

    /// @notice Allow everyone to withdraw contract ERC20 balance and send it to owner
    function withdrawERC20(IERC20 _erc20Token) external {
        _erc20Token.transfer(dao, _erc20Token.balanceOf(address(this)));
    }
}
