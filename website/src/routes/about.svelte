<script>
	import SvelteSeo from 'svelte-seo';

	const title = 'About | mint trees';
	const description = 'Everything you need to know about mint trees';
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
		url: 'https://mint-trees.pages.dev/about',
		type: 'website',
		images: [
			{
				url: 'https://mint-trees.pages.dev/favicon.png',
				alt: 'mint trees Logo'
			}
		]
	}}
/>

<main class="container">
	<div class="flex">
		<h1>about</h1>
	</div>

	<div class="mx-2">
		<h2>you</h2>
		<p>...</p>
		<h2>web3 services</h2>
		<p>
			mint trees aims to make planting trees programmable. web3 projects can use the service to
			incentivise & reward users, simply do good or everything beyond, imaginable with trees
			on-chain. -> for further details please see integrate.
		</p>

		<h2>support</h2>
		<p>...</p>

		<h2>roadmap</h2>
		<p>...</p>
	</div>
</main>

<style lang="postcss">
	h1 {
		@apply text-4xl mt-4 bg-mt-secondary rounded-r-xl p-2;
	}
	h2 {
		@apply text-3xl mt-2;
	}
</style>
