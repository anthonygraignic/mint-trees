<script>
	import SvelteSeo from 'svelte-seo';
	import ErrorComponent from '../lib/components/ErrorComponent.svelte';
	import OnlyConnected from '../lib/components/OnlyConnected.svelte';
	import ProjectCard from '../lib/components/projects/ProjectCard.svelte';

	import { signerAddress } from '$lib/wallet';
	import { getMintTreesContract, swap, getFirstTokenIdOwned } from '$lib/minttrees';

	const title = 'Projects | mint trees';
	const description = 'Trees projects';

	let projects = [
		{
			name: 'Mangrove planting in Madagascar',
			trees: 58,
			image:
				'https://offsetearth.imgix.net/app/uploads/20191101094125/IMG_7190-1024x765.jpg?w=600&auto=format'
		},
		{
			name: 'Forest restoration in Kenya',
			trees: 15,
			image:
				'https://offsetearth.imgix.net/app/uploads/20210720111136/IMG_20200424_114137wm-1024x484.jpeg?w=600&auto=format'
		},
		{
			name: 'Reforestation projects in Mozambique',
			trees: 24,
			image:
				'https://offsetearth.imgix.net/app/uploads/20200921150119/IMG_20200810_122546_205wm-1024x461.jpg?w=600&auto=format'
		},
		{
			name: 'Planting forest gardens in Uganda',
			trees: 3,
			image:
				'https://offsetearth.imgix.net/app/uploads/20210715122532/IMG_3147.jpg-1024x683.jpg?w=600&auto=format'
		}
	];

	let error = undefined;
	let hasMintTreeToken = false;
	let yourProjects = [
		{
			name: 'Mangrove planting in Madagascar',
			trees: 5800,
			image:
				'https://offsetearth.imgix.net/app/uploads/20191101094125/IMG_7190-1024x765.jpg?w=600&auto=format'
		}
	];

	signerAddress.subscribe(async (signerAddress) => {
		if (signerAddress) {
			error = undefined;
			hasMintTreeToken = (await getMintTreesContract().balanceOf(signerAddress)) > 0;
		}
	});

	$: canSwap = $signerAddress && hasMintTreeToken;

	async function swapTrees() {
		try {
			const tokenId = await getFirstTokenIdOwned($signerAddress);
			await swap(tokenId);
		} catch (err) {
			console.log(err);
			error = err;
		}
	}
</script>

<SvelteSeo
	{title}
	{description}
	twitter={{
		site: '@minttrees_dao',
		title,
		description,
		image: 'https://mint-trees.pages.dev/favicon.png',
		imageAlt: 'mint trees Logo'
	}}
	openGraph={{
		title,
		description,
		url: 'https://mint-trees.pages.dev/trees',
		type: 'website',
		images: [
			{
				url: 'https://mint-trees.pages.dev/favicon.png',
				alt: 'mint trees Logo'
			}
		]
	}}
/>

<main class="container sm:px-4 mx-auto">
	<div class="flex">
		<h1 class="text-4xl mt-4 bg-mt-secondary rounded-r-xl p-2">trees</h1>
	</div>
	<section>
		<h2>Your projects</h2>
		<ErrorComponent bind:error>
			<OnlyConnected bind:error>
				<div class="grid grid-flow-col auto-rows-fr auto-cols-fr gap-4">
					{#if hasMintTreeToken}
						{#each yourProjects as project}
							<ProjectCard
								title={project.name}
								imgSrc={project.image}
								description="🌳 {project.trees}"
								canVote={true}
								canSwap={false}
							/>
						{/each}
					{:else}
						<div class="flex flex-col mx-auto">
							<p class="text-red-500">No Mint Trees token owned</p>
							<a
								href="/"
								sveltekit:prefetch
								class="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
							>
								Buy one
							</a>
						</div>
					{/if}
				</div>
			</OnlyConnected>
		</ErrorComponent>
	</section>

	<hr class="my-8" />
	<section>
		<h2>All projects</h2>
		<div class="grid grid-flow-col auto-rows-fr auto-cols-fr gap-4">
			{#each projects as project}
				<ProjectCard
					title={project.name}
					imgSrc={project.image}
					description="🌳 {project.trees}"
					canVote={false}
					{canSwap}
					swap={swapTrees}
				/>
			{/each}
		</div>
	</section>
</main>

<style lang="postcss">
	h2 {
		@apply text-3xl font-bold mt-6 mb-4;
	}
</style>
