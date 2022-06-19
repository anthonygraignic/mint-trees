<script context="module">
	import { vars } from '$lib/env-variables';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch }) {
		try {
			// https://api.covalenthq.com/v1/1/address/demo.eth/balances_v2/?key=ckey_a653b9eb8685446291811a55c5c
			const url = `https://api.covalenthq.com/v1/${vars.CHAIN_ID}/tokens/${vars.PROJA_CONTRACT_ADDRESS}/token_holders/?key=${vars.COVALENT_API_KEY}`;
			const res = await fetch({ method: 'GET', url });
			const json = await res.json();
			// console.log(json);
			// console.log(json.data.items);
			let voters =
				json.data.items.map((item) => {
					return item.address;
				}) || [];

			return {
				status: res.status,
				props: {
					voters
				}
			};
		} catch (err) {
			return {
				error: err
			};
		}
	}
</script>

<script>
	let project = {
		name: 'Mangrove planting in Madagascar',
		description:
			'Madagascar is an island country in the Indian Ocean, approximately 400 kilometres off the coast of East Africa. It is the world’s second largest island country, after Indonesia, and the island of Madagascar itself is the fourth largest island in the world. The country is considered a biodiversity hotspot, and over 90% of its wildlife is found nowhere else on Earth.<br/> In recent years, vast areas of Madagascar’s original forests have been destroyed, displacing entire animal species and diminishing local people’s ability to farm and live on the land. Entire mangrove estuaries are also gone, leaving the bare earth to wash away into the sea. These mangrove forests are not only crucial carbon sinks, they also provide habitats for a wide range of marine species that live in the shallows, and provide vital coastal protection from floods and storms.',
		trees: 5800,
		image:
			'https://offsetearth.imgix.net/app/uploads/20191101094125/IMG_7190-1024x765.jpg?w=600&auto=format'
	};
	export let voters = [
		'0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
		'0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f'
	];
</script>

<main class="container sm:px-4 mx-auto">
	<div class="grid sm:grid-flow-col grid-flow-row items-center justify-items-center gap-4">
		<img src={project.image} alt={project.name} />

		<div class="flex flex-col">
			<h1 class="text-4xl font-bold mt-4 mb-2">{project.name}</h1>
			<p>{@html project.description}</p>

			<div>
				<h2 class="text-2xl">Voters</h2>
				{#each voters as voter}
					<p>
						{voter.substring(0, 6)}...{voter.substring(voter.length - 4, voter.length)}
					</p>
				{/each}
			</div>

			<div>
				<h2 class="text-2xl">Updates</h2>
				<p>...</p>
			</div>

			<a
				href="https://snapshot.org/#/"
				rel="external noopener"
				target="_blank"
				class="place-self-end py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
			>
				Vote
			</a>
		</div>
	</div>
</main>
