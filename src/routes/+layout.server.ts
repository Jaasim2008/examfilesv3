// src/routes/+layout.server.ts
import { supabase } from '$lib/supabaseClient';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const { data, error } = await supabase.from('main').select('*');
	if (error) throw new Error(error.message);

	return { allExamFiles: data };
};
