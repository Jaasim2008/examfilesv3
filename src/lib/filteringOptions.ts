import { writable } from "svelte/store";
import { supabase } from "./supabaseClient";

let uniqueYears: any[] = [];
let uniqueClassSubject: any[] = [];

async function getDistinctYears() {
    const { data, error } = await supabase.from('main').select('Year');
    if (!error) {
        uniqueYears = [...new Set(data.map(row => row.Year))];
    } else {console.error(`filteringOptions.ts:getDistinctYears() -> ${error}`)}
}

async function getDistinctClassSubject() {
    const { data, error } = await supabase.from('main').select('"Class/Subject"');
    if (!error) {
        uniqueClassSubject = [...new Set(data.map(row => row["Class/Subject"]))];
    } else {console.error(`filteringOptions.ts:getDistinctClassSubject() -> ${error}`)}
}

let finalThingToWrite = {};
const filteringOptionsStore = writable({});

export async function getOptions() {
    await getDistinctYears()
    await getDistinctClassSubject()
    filteringOptionsStore.set({
        'distinctYears': uniqueYears,
        'distinctClassSubject': uniqueClassSubject
    })
}

export default filteringOptionsStore;