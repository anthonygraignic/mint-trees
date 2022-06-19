<script>
	import SvelteSeo from 'svelte-seo';
	import PlantForm from '../lib/components/PlantForm.svelte';

	const title = 'mint trees';
	const description = 'Non fungible contributions for non fungible real trees';
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

<main>
	<div class="flex max-w-3xl justify-center mx-auto">
		<PlantForm />
	</div>

	<!-- <button
		type="button"
		class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
	>
		<svg
			class="w-4 h-4 mr-2 -ml-1 text-[#626890]"
			aria-hidden="true"
			focusable="false"
			data-prefix="fab"
			data-icon="ethereum"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 320 512"
			><path
				fill="currentColor"
				d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
			/></svg
		>
		Pay with Ethereum
	</button> -->
</main>
