// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IMintTreeToken is IERC721 {
    event ProjectAdded(address project);
    event ProjectRemoved(address project);

    function mint(uint256 trees) external payable;

    function setTreeEquivalentUnitPrice(uint256 newUnitPrice) external;
}
