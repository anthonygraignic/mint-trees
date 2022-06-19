<script>
	export let id = 0;
	export let imgSrc = '/favicon.png';
	export let title = 'Lorem Ipsum';
	export let description;
	export let canVote;
	export let canSwap;

	export let swap = () => {};
</script>

<div
	class="flex flex-col justify-between max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
>
	<a href="/trees/{id}">
		<img class="rounded-t-lg" src={imgSrc} alt={title} />
	</a>
	<div class="p-5">
		<a href="/trees/{id}">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
		</a>
		{#if description}
			<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
				{description}
			</p>
		{/if}
		<div class="flex justify-between mt-4 space-x-3 lg:mt-6">
			<a
				href="/trees/{id}"
				class="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Read more
			</a>

			{#if canVote}
				<a
					href="https://snapshot.org/#/"
					rel="external noopener"
					target="_blank"
					class="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				>
					Vote
				</a>
			{:else if canSwap}
				<button
					on:click={swap}
					class="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				>
					Swap
				</button>
			{/if}
		</div>
	</div>
</div>
