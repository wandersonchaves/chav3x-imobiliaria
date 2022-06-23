import { useEffect } from 'react';
import { useSinglePrismicDocument } from '@prismicio/react';

import { NotFound } from '../NotFount';
import { CongratsBanner } from '../../components/CongratsBanner';
import { Loading } from '../../components/Loading';

export const Congrats = () => {
  const [congrats, congratsState] = useSinglePrismicDocument('congrats');

  const notFound = congratsState.state === 'failed';
  const loading = congratsState.state === 'loading';

  useEffect(() => {
    if (congratsState.state === 'failed') {
      console.warn(
        'Homepage document was not found. Make sure it exists in your Prismic repository.',
      );
    } else if (congratsState.state === 'loading') {
      console.warn('Loading...');
    }
  }, [congratsState.state]);

  if (congrats) {
    return <CongratsBanner banner={congrats.data.congrats_banner[0]} />;
  } else if (loading) {
    return <Loading />;
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
};
