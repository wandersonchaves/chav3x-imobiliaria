import * as prismic from '@prismicio/client';

export const repositoryName = 'chav3x-imobiliaria';

export const client = prismic.createClient(repositoryName, {
  accessToken: '',

  routes: [
    {
      type: 'homepage',
      path: '/',
    },
    {
      type: 'houses',
      path: '/:uid',
    },
  ],
});
