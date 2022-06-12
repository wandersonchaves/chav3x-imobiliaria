import { useEffect } from 'react';
import { useSinglePrismicDocument } from '@prismicio/react';

import { Layout } from '../../components/Layout';
import { NotFound } from '../NotFount';
import { ThanksBanner } from '../../components/ThanksBanner';

export const Thanks = () => {
  const [thanks, thanksState] = useSinglePrismicDocument('thanks');

  const notFound = thanksState.state === 'failed';

  useEffect(() => {
    if (thanksState.state === 'failed') {
      console.warn(
        'Thanks document was not found. Make sure it exists in your Prismic repository.',
      );
    }
  }, [thanksState.state]);

  if (thanks) {
    return (
      <Layout wrapperClass="thanks">
        <ThanksBanner banner={thanks.data.thanks_banner[0]} />
      </Layout>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
};
