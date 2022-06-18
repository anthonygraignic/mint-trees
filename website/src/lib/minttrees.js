import contract from './data/contract';
import { getSignerOrProvider } from './wallet';

export function getMintTreesContract() {
	return new ethers.Contract(contract.address, contract.abi, getSignerOrProvider());
}

export async function getUnitPrice() {
	return getMintTreesContract().unitPrice();
}

export async function mint(trees, total) {
	return getMintTreesContract().mint(trees, { value: ethers.utils.parseEther(`${total}`) });
}
