import { writable } from 'svelte/store';

interface Filters {
    year?: number | string; // Allow string as it comes from select/input
    sub?: string;
    qp?: string;
}

// Initialize with empty filters
const initialFilters: Filters = {
    year: undefined,
    sub: undefined,
    qp: undefined,
};

export const currentFilters = writable<Filters>(initialFilters);