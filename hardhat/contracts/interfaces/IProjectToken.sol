// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IProjectToken is IERC721 {
    function swap(uint256 tokenId) external;
}
