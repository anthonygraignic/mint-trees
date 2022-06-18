<script>
	import SvelteSeo from 'svelte-seo';
	import ErrorComponent from '../lib/components/ErrorComponent.svelte';
	import OnlyConnected from '../lib/components/OnlyConnected.svelte';
	import ProjectCard from '../lib/components/projects/ProjectCard.svelte';

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

	let yourProjects = [
		{
			name: 'Mangrove planting in Madagascar',
			trees: 5800,
			image:
				'https://offsetearth.imgix.net/app/uploads/20191101094125/IMG_7190-1024x765.jpg?w=600&auto=format'
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
		<h2>Your projects</h2>
		<ErrorComponent bind:error>
			<OnlyConnected bind:error>
				<div class="grid grid-flow-col auto-rows-fr auto-cols-fr gap-4">
					{#each yourProjects as project}
						<ProjectCard
							title={project.name}
							imgSrc={project.image}
							description="🌳 {project.trees}"
							vote={true}
						/>
					{/each}
				</div>
			</OnlyConnected>
		</ErrorComponent>
	</section>

	<hr class="my-8" />
	<section>
		<h2>All projects</h2>
		<div class="grid grid-flow-col auto-rows-fr auto-cols-fr gap-4">
			{#each projects as project}
				<ProjectCard title={project.name} imgSrc={project.image} description="🌳 {project.trees}" />
			{/each}
		</div>
	</section>
</main>

<style lang="postcss">
	h2 {
		@apply text-3xl font-bold mt-6 mb-4;
	}
</style>
