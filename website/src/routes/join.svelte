<script>
	import SvelteSeo from 'svelte-seo';

	const title = 'Join | mint trees';
	const description = 'Joint mint trees';
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
		url: 'https://mint-trees.pages.dev/join',
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
		<h1 class="text-4xl mt-4 bg-mt-secondary rounded-r-xl p-2">join</h1>
	</div>
	<p>...</p>
</main>
