import { useEffect } from 'react';
import { useSinglePrismicDocument } from '@prismicio/react';

import { Layout } from '../../components/Layout';
import { HomepageBanner } from '../../components/HomepageBanner';
import { NotFound } from '../NotFount';

export const HomePage = () => {
  const [home, homeState] = useSinglePrismicDocument('homepage');

  const notFound = homeState.state === 'failed';

  useEffect(() => {
    if (homeState.state === 'failed') {
      console.warn(
        'Homepage document was not found. Make sure it exists in your Prismic repository.',
      );
    }
  }, [homeState.state]);

  if (home) {
    return (
      <Layout wrapperClass="homepage">
        <HomepageBanner banner={home.data.homepage_banner[0]} />
      </Layout>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
};
