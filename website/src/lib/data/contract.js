import { vars } from '$lib/env-variables';
import jsonMintTree from './abis/MintTreeToken.json';
import jsonProject from './abis/ProjectAToken.json';

export const minttrees = {
	address: vars.MINTTREES_CONTRACT_ADDRESS,
	chainId: vars.CHAIN_ID,
	abi: jsonMintTree.abi
};

export const projectA = {
	address: vars.PROJA_CONTRACT_ADDRESS,
	chainId: vars.CHAIN_ID,
	abi: jsonProject.abi
};
