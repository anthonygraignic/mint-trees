// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IProjectToken.sol";
import "./interfaces/IMintTreeToken.sol";

contract ProjectAToken is
    IProjectToken,
    ERC721,
    ERC721Enumerable,
    Ownable,
    EIP712,
    ERC721Votes
{
    /// @notice Mint Tree contract address
    IMintTreeToken public mintTree;

    // The internal ID tracker
    uint256 private _currentId;

    /// @dev Contract URI used by OpenSea to get contract details (owner, royalties...)
    string public contractURI;

    constructor(
        IMintTreeToken _mintTree,
        string memory _contractURI,
        address _owner
    ) ERC721("ProjectAToken", "M3T1") EIP712("MintTreeProjectToken", "1") {
        mintTree = _mintTree;
        contractURI = _contractURI;
        if (_owner != address(0)) {
            _transferOwnership(_owner);
        }
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "ipfs://bafybeibumtkc5dn2gubon3qy3by22kh5zsita3o5xzgwwk73imks367cva/";
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
        override(ERC721, ERC721Enumerable, IERC165)
        returns (bool)
    {
        return
            interfaceId == this.royaltyInfo.selector ||
            super.supportsInterface(interfaceId);
    }

    function swap(uint256 tokenId) external override {
        require(
            mintTree.ownerOf(tokenId) == msg.sender,
            "not owner of tokenId"
        );

        // TODO transfert it or burn it ?
        mintTree.transferFrom(msg.sender, address(this), tokenId);
        _mint(msg.sender, _currentId++);
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
        // (royaltiesRecipient || owner), 5%
        return (owner(), (amount * 500) / 10000);
    }
}
