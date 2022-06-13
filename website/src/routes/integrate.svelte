<script>
	import SvelteSeo from 'svelte-seo';

	const title = 'Integrate | mint trees';
	const description = 'Integrate mint trees into your project';
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
		url: 'https://mint-trees.pages.dev/integrate',
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
	<div class="flex flex-col">
		<div class="flex">
			<h1 class="text-4xl mt-4 bg-mt-secondary rounded-r-xl p-2">integrate</h1>
		</div>
		<p class="mt-4">
			if you are a DEX, marketplace, money market, social media app, ... or simply like trees, we
			are more than happy to mint trees for you and your users.
		</p>
		<p class="text-mt-green">#1swap1tree</p>
		<img src="/workflow.png" alt="Mint trees' workflow" class="my-8 max-w-sm self-center" />

		<p class="mt-4">
			further examples: <span class="text-mt-green">#1post1tree #1mint1tree #yield2tree</span>
		</p>
		<p class="mt-4">
			If you are a game, metaverse project, artist or have ideas how to utilize trees on chain, we
			are more than happy to chat with you.
		</p>
	</div>
</main>
