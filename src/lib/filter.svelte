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

<div class="flex flex-col items-center gap-4 mb-10 pl-2 relative border border-gray-700 p-4 rounded">
    <h4 class={`md:text-lg md:font-semibold absolute left-2 top-0 -translate-y-4 ${darkmode ? 'bg-dark-background' : 'bg-background'} px-1`}>Filters:</h4>
    <div class="flex flex-col md:flex-row gap-y-4 md:gap-y-2 md:gap-x-2 md:mx-4">
        <div class="flex items-center gap-2 text-sm md:text-base">
            <label for="year">Year:</label>
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
        </div>
        <div class="flex items-center gap-2 text-sm md:text-base">
            <label class="text-nowrap" for="sub">Class/Subject: </label>
            <select
                name="sub"
                bind:value={selectedSub}
                on:change={updateUrlParams}
                class={`${darkmode? 'bg-dark-secondary' : 'bg-secondary'} text-white px-2 py-1 rounded text-sm md:text-base`}
            >
                <option value="">All Subjects</option>
                {#each toRenderOptions.distinctClassSubject as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        </div>
        <div class="flex items-center gap-2 text-sm md:text-base">
            <label class="text-nowrap" for="text">QP name:</label>
            <input
                type="text"
                name="qp"
                bind:value={searchQP}
                on:input={updateUrlParams}
                class={`text-white placeholder-slate-100 px-2 py-0.5 md:py-1 rounded ${darkmode ? 'bg-dark-secondary' : 'bg-secondary'} text-sm md:text-base w-4/6`}
            />
        </div>
    </div>
    <div class="flex gap-4">
        <button type="button" class={`${darkmode ? 'bg-dark-primary' : 'bg-primary'} text-white px-4 py-1 rounded ${darkmode ? 'hover:bg-dark-secondary' : 'hover:bg-secondary'} transition cursor-pointer text-sm md:text-base`}>Apply</button>
        <button on:click={clearFilters} type="button" class={`text-sm ${darkmode ? 'text-dark-primary' : 'text-primary'} ${darkmode ? 'text-dark-secondary' : 'text-secondary'} underline text-xs md:text-base`}>Clear</button>
    </div>
</div>