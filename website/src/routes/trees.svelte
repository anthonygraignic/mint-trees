<script>
	import SvelteSeo from 'svelte-seo';

	const title = 'Projects | mint trees';
	const description = 'Trees projects';

	let projects = [
		{ name: 'Mangrove planting in Madagascar', trees: 58 },
		{ name: 'Forest restoration in Kenya', trees: 15 },
		{ name: 'Reforestation projects in Mozambique', trees: 24 },
		{ name: 'Planting forest gardens in Uganda', trees: 3 }
	];

	let contributors = [
		{
			address: '0x2387b.0.0.08e9',
			ens: 'bimorphism.eth',
			projects: [
				{ name: 'Mangrove planting in Madagascar', trees: 1 },
				{ name: 'Forest restoration in Kenya', trees: 1 },
				{ name: 'Reforestation projects in Mozambique', trees: 1 },
				{ name: 'Planting forest gardens in Uganda', trees: 1 }
			]
		}
	];
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
		<h2>tree planting projects & number trees planted</h2>
		<h3>total</h3>
		{#each projects as project}
			<p><span class="underline">{project.name}</span> 🌳 {project.trees}</p>
		{/each}
	</section>

	<section class="mt-4">
		<h1>Contributors</h1>
		{#each contributors as contributor}
			<h3>
				{contributor.address.substring(0, 4)}...{contributor.address.substring(
					contributor.address.length - 4
				)} ({contributor.ens})
			</h3>
			{#each contributor.projects as project}
				<p><span class="underline">{project.name}</span> 🌳 {project.trees}</p>
			{/each}
		{/each}
	</section>
</main>
