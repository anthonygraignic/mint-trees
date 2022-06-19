import { minttrees, projectA } from './data/contract';
import { getSignerOrProvider } from './wallet';

export function getMintTreesContract() {
	return new ethers.Contract(minttrees.address, minttrees.abi, getSignerOrProvider());
}

export function getProjectAContract() {
	return new ethers.Contract(projectA.address, projectA.abi, getSignerOrProvider());
}

export async function getUnitPrice() {
	return getMintTreesContract().unitPrice();
}

export async function mint(trees, total) {
	return getMintTreesContract().mint(trees, { value: ethers.utils.parseEther(`${total}`) });
}

export async function getFirstTokenIdOwned(address) {
	return getMintTreesContract().tokenOfOwnerByIndex(address, 0);
}

// project A token

export async function swap(tokenId) {
	return getProjectAContract().swap(tokenId);
}
