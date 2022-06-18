<script>
	import { page } from '$app/stores';
	import SvelteSeo from 'svelte-seo';

	const title = 'Congratulations | mint trees';
	const description = "You've just minted trees, thank you for you contribution.";

	const quantity = $page.url.searchParams.get('quantity') || 0;
	const tx = $page.url.searchParams.get('tx');
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
		url: 'https://mint-trees.pages.dev',
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
	<section class="flex justify-center py-4">
		<div
			class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
		>
			<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Congratulations 🎉️🎉️🎉️
			</h1>
			<p class="font-normal text-gray-700 dark:text-gray-400">
				You have minted <b>{quantity}</b> trees 🌳️ !
			</p>
			<img src="/favicon.png" alt="" class="my-4 dark:invert" />
			<a
				href="/trees"
				sveltekit:prefetch
				class="mt-6 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
			>
				Let now explore projects
				<svg
					class="ml-2 -mr-1 w-4 h-4"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
			</a>
		</div>
	</section>
</main>
