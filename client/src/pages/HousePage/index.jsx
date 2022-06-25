import { usePrismicDocumentByUID } from '@prismicio/react';
import { useEffect, useRef, useState } from 'react';
import { ImArrowLeft2 } from 'react-icons/im';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NotFound } from '../NotFount';
import { useVideoPlayer } from '../../components/VideoPlayer';

import './styles.css';
import { Loading } from '../../components/Loading';

export function HousePage() {
  const { uid } = useParams();

  const [house, houseState] = usePrismicDocumentByUID('houses', uid);

  const notFound = houseState.state === 'failed';
  const loading = houseState.state === 'loading';

  useEffect(() => {
    if (houseState.state === 'failed') {
      console.warn(
        'Homepage document was not found. Make sure it exists in your Prismic repository.',
      );
    } else if (houseState.state === 'loading') {
      console.warn('Loading...');
    }
  }, [houseState.state]);

  const videoElement = useRef(null);
  const { togglePlay } = useVideoPlayer(videoElement);

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

  if (house && timeLoopToHome >= 100) {
    return navigate('/houses');
  }

  if (house) {
    return (
      <div className="h-screen w-screen">
        <Link
          to="/houses"
          className="absolute z-10 p-8 mButtonBackToHouses rounded-full font-bold text-slate-200 bg-lime-500 hover:bg-lime-600"
        >
          <ImArrowLeft2 size={25} color="#fff" />
        </Link>

        <div className="h-screen w-screen">
          <video
            className="h-screen w-screen"
            onClick={togglePlay}
            autoPlay
            loop
            ref={videoElement}
            src={house.data.video.url}
          />
        </div>

        <Link
          to="/congrats"
          className="absolute bottom-0 p-8 mButtonFinish rounded-full font-bold text-slate-200 bg-lime-500 hover:bg-lime-600"
        >
          FINALIZAR
        </Link>
      </div>
    );
  } else if (loading) {
    return <Loading />;
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
