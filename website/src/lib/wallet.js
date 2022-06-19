import { get, writable } from 'svelte/store';
import { connectWallet } from './provider';

export const ethereumProvider = writable(null);
export const signer = writable(null);
export const signerAddress = writable(null);
export const provider = writable(null);
export const chainId = writable(null);

ethereumProvider.subscribe((value) => {
	if (value) {
		value.on('accountsChanged', handleAccountsChanged);
		value.on('chainChanged', (id) => handleChainChanged(id, true));
	}
});

async function getInstances() {
	const instances = await connectWallet();
	provider.set(instances.provider);
	ethereumProvider.set(instances.ethereumProvider);

	return instances;
}

export async function connect() {
	try {
		const instances = await getInstances();
		const chainId = await instances.ethereumProvider.request({ method: 'eth_chainId' });
		await handleChainChanged(chainId, false);
		if (localStorage.getItem('wallet:connected')) {
			await connectAccount();
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function connectAccount() {
	await get(ethereumProvider).request({ method: 'eth_requestAccounts' });
	await handleAccountsChanged();
	localStorage.setItem('wallet:connected', 'true');
}

export function disconnect() {
	localStorage.removeItem('wallet:connected');
	signer.set(null);
	signerAddress.set(null);
}

/**
 * Handle account change in wallet
 */
async function handleAccountsChanged() {
	try {
		const _signer = getProvider().getSigner();
		signer.set(_signer);

		// get current signer address.
		if (_signer) {
			signerAddress.set(await _signer.getAddress());
		} else {
			// null if disconnected
			signerAddress.set(null);
		}
	} catch (e) {
		console.error(e);
		throw e;
	}
}

/**
 * Handle a chain change in wallet
 * @param {*} _chainId
 * @param {*} refresh
 */
async function handleChainChanged(_chainId, refresh = true) {
	if (refresh) {
		// window.location.reload();
		await getInstances();
		await handleAccountsChanged();
	}
	chainId.set(_chainId);
}

export function getChainId() {
	return get(chainId);
}

export function getSignerOrProvider() {
	return get(signer) || get(provider);
}

export function getSigner() {
	return get(signer);
}

export function getEthereumProvider() {
	return get(ethereumProvider);
}

export function getProvider() {
	return get(provider);
}
