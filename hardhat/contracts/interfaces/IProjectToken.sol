// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IProjectToken is IERC721 {
    function convert() external;
}
