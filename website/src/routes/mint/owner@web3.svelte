<script>
	import { signerAddress } from '$lib/wallet';
	import { getMintTreesContract } from '$lib/minttrees';
	import ErrorComponent from '../../lib/components/ErrorComponent.svelte';
	import OnlyConnected from '../../lib/components/OnlyConnected.svelte';

	let error;

	let isDAO = false;
	let projectAddress;

	signerAddress.subscribe(async (signerAddress) => {
		if (signerAddress) {
			error = undefined;
			console.log(await (await getMintTreesContract()).dao());
			isDAO = (await (await getMintTreesContract()).dao()) == signerAddress;
		}
	});

	async function addProject() {
		await (await getMintTreesContract()).addProject(projectAddress);
	}
</script>

<main class="container sm:px-4 mx-auto">
	<ErrorComponent bind:error>
		<OnlyConnected>
			{#if isDAO}
				<div class="mb-6">
					<label
						for="projectContract"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>Project Contract Address</label
					>
					<input
						type="text"
						id="projectContract"
						placeholder="0x..."
						bind:value={projectAddress}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>

					<button
						type="button"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						on:click={addProject}>Add project</button
					>
				</div>
			{:else}
				<p>Not DAO</p>
			{/if}
		</OnlyConnected>
	</ErrorComponent>
</main>
