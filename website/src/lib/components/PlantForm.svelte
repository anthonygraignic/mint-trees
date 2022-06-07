<script>
	let trees;
	let unitPrice = 0.33;
	function onSubmit() {
		alert(`Planted ${trees} trees`);
	}
</script>

<form class="flex flex-col justify-items-center" on:submit={onSubmit}>
	<div class="mb-6">
		<label for="trees" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>Trees to plant</label
		>
		<input
			type="number"
			id="trees"
			class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
			placeholder="1000"
			bind:value={trees}
			required
		/>
	</div>
	<div class="mb-6">
		<label for="unitPrice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>USDC per tree</label
		>
		<input
			type="number"
			id="unitPrice"
			step=".01"
			class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
			bind:value={unitPrice}
			required
		/>
	</div>

	<p>Total: {trees ? (trees * unitPrice).toFixed(2) : '0'} USDC</p>

	<button
		type="submit"
		class="self-end text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
		>plant</button
	>
</form>
