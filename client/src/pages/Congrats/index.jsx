import { useEffect, useState } from 'react';
import { useSinglePrismicDocument } from '@prismicio/react';

import { NotFound } from '../NotFount';
import { CongratsBanner } from '../../components/CongratsBanner';
import { Loading } from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  const [timeLoopToHome, setTimeLoopToHome] = useState(0);

  function handleTimeLoopToHome() {
    if (timeLoopToHome) {
      clearInterval(timeLoopToHome);
      setTimeLoopToHome(0);
    }

    setInterval(() => {
      setTimeLoopToHome((prevCount) => prevCount + 1);
    }, 1000);
  }

  // Executa o timer pela primeira vez automaticamente
  useEffect(() => {
    setInterval(() => {
      handleTimeLoopToHome();
    }, 10000);
  }, []);

  if (congrats && timeLoopToHome >= 100) {
    return navigate('/');
  }

  if (congrats) {
    return <CongratsBanner banner={congrats.data.congrats_banner[0]} />;
  } else if (loading) {
    return <Loading />;
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
};
