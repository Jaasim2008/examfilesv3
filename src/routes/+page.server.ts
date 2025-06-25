import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  return {
    filters: {
      year: url.searchParams.get('year'),
      sub: url.searchParams.get('sub'),
      qp: url.searchParams.get('qp'),
    }
  };
};
