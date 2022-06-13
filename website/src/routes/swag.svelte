<script>
	import SvelteSeo from 'svelte-seo';

	const title = 'Swag | mint trees';
	const description = 'Get your mint trees swag';
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
		url: 'https://mint-trees.pages.dev/swag',
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
		<h1 class="text-4xl mt-4 bg-mt-secondary rounded-r-xl p-2">swag</h1>
	</div>
	<p>
		unfortunately there is nothing like “green shopping” or “shop for the planet”. Better not buy
		the top ;-) But if you “have to” buy a shirt or hoodie or bag anyways, probably there is
		something - responsible - for you.
	</p>

	<div class="flex justify-center">
		<img src="/swag_1f 1.jpg" alt="" class="mb-6" />
		<img src="/swag_1b1 1.jpg" alt="" class="mt-6" />
	</div>
	<p>w2c? DM what you are looking for.</p>
</main>
