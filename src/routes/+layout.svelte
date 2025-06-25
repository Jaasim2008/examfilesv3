<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { examFiles } from '$stores/examfiles';
	export let data;

	// Set the data in the store
	examFiles.set(data.allExamFiles);
</script>

<slot />

