import { useEffect } from 'react';
import { useSinglePrismicDocument } from '@prismicio/react';

import { NotFound } from '../NotFount';
import { ThanksBanner } from '../../components/ThanksBanner';
import { Loading } from '../../components/Loading';

export const Thanks = () => {
  const [thanks, thanksState] = useSinglePrismicDocument('thanks');

  const notFound = thanksState.state === 'failed';
  const loading = thanksState.state === 'loading';

  useEffect(() => {
    if (thanksState.state === 'failed') {
      console.warn(
        'Homepage document was not found. Make sure it exists in your Prismic repository.',
      );
    } else if (thanksState.state === 'loading') {
      console.warn('Loading...');
    }
  }, [thanksState.state]);

  if (thanks) {
    return <ThanksBanner banner={thanks.data.thanks_banner[0]} />;
  } else if (loading) {
    return <Loading />;
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
};
