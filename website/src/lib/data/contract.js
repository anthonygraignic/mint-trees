import jsonABI from './abis/MintTreeToken.json';

export default {
	address: import.meta.env.VITE_CONTRACT_ADDRESS,
	chainId: import.meta.env.VITE_CHAIN_ID,
	abi: jsonABI.abi
};
