/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_MINTTREES_CONTRACT_ADDRESS: string;
	VITE_PROJA_CONTRACT_ADDRESS: string;
	VITE_EXPLORER_URL: string;
	VITE_CHAIN_ID: number;
	VITE_COVALENT_API_KEY: string;
}
