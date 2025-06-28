<script lang="ts">
    export let darkmode: boolean; //theme detection
    import filteringOptionsStore, { getOptions } from "$lib/filteringOptions";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { currentFilters } from "$lib/currentFilters"; // Import the new store

    interface FilteringOptions {
        distinctYears: string[];
        distinctClassSubject: string[];
    }

    let toRenderOptions: FilteringOptions = {} as FilteringOptions;

    // Local variables to bind to the select/input elements
    let selectedYear: string | undefined;
    let selectedSub: string | undefined;
    let searchQP: string | undefined;

    // Use a reactive declaration to update the store when local variables change
    // This will run whenever selectedYear, selectedSub, or searchQP change
    $: {
        $currentFilters = {
            year: selectedYear ? parseInt(selectedYear) : undefined, // Convert year to number if selected
            sub: selectedSub || undefined,
            qp: searchQP || undefined,
        };
    }

    // Initialize local variables from URL search params on mount
    // This handles initial load and deep linking
    onMount(async () => {
        await getOptions();
        toRenderOptions = get(filteringOptionsStore);

        // Get initial filter values from URL and set local variables
        // This makes sure filters are applied if someone opens a URL with filters
        const urlParams = new URLSearchParams(window.location.search);
        selectedYear = urlParams.get('year') || undefined;
        selectedSub = urlParams.get('sub') || undefined;
        searchQP = urlParams.get('qp') || undefined;
    });

    // Function to handle clearing filters and updating URL
    function clearFilters() {
        selectedYear = undefined;
        selectedSub = undefined;
        searchQP = undefined;
        // Optionally update the URL to remove params
        const url = new URL(window.location.href);
        url.searchParams.delete('year');
        url.searchParams.delete('sub');
        url.searchParams.delete('qp');
        window.history.replaceState({}, '', url.toString());
    }

    // Function to update URL search params based on current filter state
    function updateUrlParams() {
        const url = new URL(window.location.href);
        if (selectedYear) {
            url.searchParams.set('year', selectedYear);
        } else {
            url.searchParams.delete('year');
        }
        if (selectedSub) {
            url.searchParams.set('sub', selectedSub);
        } else {
            url.searchParams.delete('sub');
        }
        if (searchQP) {
            url.searchParams.set('qp', searchQP);
        } else {
            url.searchParams.delete('qp');
        }
        window.history.replaceState({}, '', url.toString());
    }
</script>

<div class="flex md:flex-nowrap flex-wrap items-center gap-4 mb-10 pl-2">
    <label class="md:text-lg">Filter:</label>
    <select
        name="year"
        bind:value={selectedYear}
        on:change={updateUrlParams}
        class={`${darkmode? 'bg-dark-secondary' : 'bg-secondary'} text-white px-2 py-1 rounded text-sm md:text-base`}
    >
        <option value="">All Years</option>
        {#each toRenderOptions.distinctYears as option}
            <option value={option}>{option}</option>
        {/each}
    </select>

    <select
        name="sub"
        bind:value={selectedSub}
        on:change={updateUrlParams}
        class={`${darkmode? 'bg-dark-secondary' : 'bg-secondary'} text-white px-2 py-1 rounded grow text-sm md:text-base`}
    >
        <option value="">All Subjects</option>
        {#each toRenderOptions.distinctClassSubject as option}
            <option value={option}>{option}</option>
        {/each}
    </select>

    <input
        type="text"
        name="qp"
        placeholder="Search QP filename..."
        bind:value={searchQP}
        on:input={updateUrlParams}
        class={`text-white placeholder-slate-100 px-2 py-1 rounded border ${darkmode ? 'bg-dark-secondary' : 'bg-secondary'} ${darkmode ? 'border-dark-primary' : 'border-primary'} text-sm md:text-base`}
    />
    <button type="button" class={`${darkmode ? 'bg-dark-primary' : 'bg-primary'} text-white px-4 py-1 rounded ${darkmode ? 'hover:bg-dark-secondary' : 'hover:bg-secondary'} transition cursor-pointer text-sm md:text-base`}>Apply</button>
    <button on:click={clearFilters} type="button" class={`text-sm ${darkmode ? 'text-dark-primary' : 'text-primary'} ${darkmode ? 'text-dark-secondary' : 'text-secondary'} underline text-xs md:text-base`}>Clear</button>
</div>