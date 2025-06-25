<script lang="ts">
    export let darkmode: boolean; //theme detection
    import filteringOptionsStore, { getOptions } from "$lib/filteringOptions";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    interface FilteringOptions {
        distinctYears: string[];
        distinctClassSubject: string[];
    }

    let toRenderOptions: FilteringOptions = {} as FilteringOptions;

    onMount(async () => {
        await getOptions();
        toRenderOptions = get(filteringOptionsStore);
        console.log('toRenderOptions:', toRenderOptions);
    });
</script>

<form method="GET" class="flex flex-wrap items-center gap-4 mb-10 pl-2">
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="text-lg">Filter:</label>
    <select name="year" class={`${darkmode? 'bg-dark-secondary' : 'bg-secondary'} text-white px-2 py-1 rounded`}>
        <option value="">All Years</option>
         {#each toRenderOptions.distinctYears as option}
            <option value={option}>{option}</option>
         {/each}
    </select>

    <select name="sub" class={`${darkmode? 'bg-dark-secondary' : 'bg-secondary'} text-white px-2 py-1 rounded grow`}>
        <option value="">All Subjects</option>
        {#each toRenderOptions.distinctClassSubject as option}
            <option value={option}>{option}</option>
        {/each}
    </select>

    <!-- TODO: Fix value param -->
    <input type="text" name="qp" placeholder="Search QP filename..." value="" class={`text-white placeholder-slate-100 px-2 py-1 rounded border ${darkmode ? 'bg-dark-secondary' : 'bg-secondary'} ${darkmode ? 'border-dark-primary' : 'border-primary'}`} style="" />
    <button type="submit" class={`${darkmode ? 'bg-dark-primary' : 'bg-primary'} text-white px-4 py-1 rounded ${darkmode ? 'hover:bg-dark-secondary' : 'hover:bg-secondary'} transition cursor-pointer`}>Apply</button>
    <a href={darkmode ? '/darkmode' : '/'} class={`text-sm ${darkmode ? 'text-dark-primary' : 'text-primary'} ${darkmode ? 'text-dark-secondary' : 'text-secondary'} underline`}>Clear</a>
</form>