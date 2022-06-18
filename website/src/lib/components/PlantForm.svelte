<script>
	import { goto } from '$app/navigation';

	import { signerAddress } from '$lib/wallet';
	import { getUnitPrice, mint } from '$lib/minttrees';

	import OnlyConnected from './OnlyConnected.svelte';
	import ErrorComponent from './ErrorComponent.svelte';

	let error = undefined;
	let loading = false;
	let trees;
	let unitPrice = 0.01;

	let txHash;
	let txConfirmed = false;

	signerAddress.subscribe(async (signerAddress) => {
		if (signerAddress) {
			error = undefined;
			await updateValuesFromContract();
		}
	});

	async function updateValuesFromContract() {
		try {
			unitPrice = parseFloat(ethers.utils.formatEther(await getUnitPrice()));
		} catch (err) {
			error = err;
			console.error(err);
		}
	}

	async function onSubmit() {
		try {
			loading = true;
			txConfirmed = false;
			const tx = await mint(trees, trees * unitPrice);
			txHash = tx.hash;
			await tx.wait();
			txConfirmed = true;
			loading = false;
			goto(`/mint/congratulations?quantity=${trees}&tx=${txHash}`);
		} catch (err) {
			loading = false;
			txConfirmed = false;
			error = err;
			console.error(err);
		}
	}
</script>

<ErrorComponent bind:error>
	<div class="flex flex-col space-y-4 ">
		<form class="flex flex-col justify-items-center mx-auto" on:submit|preventDefault={onSubmit}>
			<div class="mb-6">
				<label for="trees" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Trees to plant</label
				>
				<input
					type="number"
					id="trees"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="1000"
					bind:value={trees}
					required
				/>
			</div>
			<div class="mb-6">
				<label
					for="unitPrice"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>USDC per tree</label
				>
				<input
					type="number"
					id="unitPrice"
					step=".01"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					bind:value={unitPrice}
					required
				/>
			</div>

			<p>Total: {trees ? (trees * unitPrice).toFixed(2) : '0'} USDC</p>

			<OnlyConnected bind:error
				><button
					type="submit"
					class="self-end text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				>
					<div class="flex flex-row items-center justify-center">
						{#if loading}
							<svg
								class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								/>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							<p>Loading...</p>
						{:else}
							<p>plant trees</p>
						{/if}
					</div>
				</button>
			</OnlyConnected>
		</form>

		{#if txHash}
			<p class="text-center">
				<em>
					See {txConfirmed ? '' : 'pending'} transaction
					<a
						class="underline"
						href="{import.meta.env.VITE_EXPLORER_URL}/tx/{txHash}"
						rel="external noopener"
						target="_blank">{txHash}</a
					>
				</em>
				{#if txConfirmed}
					<br />
					<br />
					<b>Congratulations</b> 🎉️🎉️🎉️, your transaction is confirmed !
					<br />You are now part of the mint trees family !
				{/if}
			</p>
		{/if}
	</div>
</ErrorComponent>
