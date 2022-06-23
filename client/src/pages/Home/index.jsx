import { useEffect } from 'react';
import { useSinglePrismicDocument } from '@prismicio/react';

import { HomepageBanner } from '../../components/HomepageBanner';
import { NotFound } from '../NotFount';
import { Loading } from '../../components/Loading';

export function HomePage() {
  const [home, homeState] = useSinglePrismicDocument('homepage');

  const notFound = homeState.state === 'failed';
  const loading = homeState.state === 'loading';

  console.log('home', home);

  useEffect(() => {
    if (homeState.state === 'failed') {
      console.warn(
        'Homepage document was not found. Make sure it exists in your Prismic repository.',
      );
    } else if (homeState.state === 'loading') {
      console.warn('Loading...');
    }
  }, [homeState.state]);

  if (home) {
    return <HomepageBanner banner={home.data.homepage_banner[0]} />;
  } else if (loading) {
    return <Loading />;
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
