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

<main class="container sm:px-4 mx-auto">
	<div class="flex">
		<h1>about</h1>
	</div>

	<div class="mx-2">
		<p>mint trees makes planting trees as easy as it can get.<br /> for you (and alice)</p>
		<img src="/workflow.png" alt="Mint Trees' Workflow" class="my-4" />
		<h2>for web3 projects</h2>
		<p>
			easy and programmable. web3 projects can use mint trees to incentivise & reward users, simply
			do good or everything beyond, imaginable with trees on-chain. for further details please see
			<a href="/integrate" sveltekit:prefetch> integrate</a>.
		</p>

		<h2>support</h2>
		<p>
			today the trees are planted via Ecologi and their tree planting partners. In the future we
			plan to work with tree planting partneres directly. Would like to <a
				href="/join"
				sveltekit:prefetch>join</a
			> us on our journey?
		</p>
	</div>
</main>

<style lang="postcss">
	h1 {
		@apply text-4xl mt-4 bg-mt-secondary rounded-r-xl p-2;
	}
	h2 {
		@apply text-3xl mt-2;
	}
	a {
		@apply underline text-mt-green dark:text-mt-green;
	}
</style>
