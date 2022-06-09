import * as prismic from '@prismicio/client';

export const repositoryName = 'chav3x-fashion';

export const client = prismic.createClient(repositoryName, {
  accessToken: '',

  routes: [
    {
      type: 'homepage',
      path: '/',
    },
    {
      type: 'page',
      path: '/:uid',
    },
  ],
});
