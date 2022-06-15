import { usePrismicDocumentByUID } from '@prismicio/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NotFound } from '../../pages/NotFount';
import { LookContext } from '../LookContext';
import { useVideoPlayer } from '../VideoPlayer';

import './styles.css';

export function LookItem() {
  const navigate = useNavigate();
  const lookContext = useContext(LookContext);

  const { uid } = useParams();

  const [look, lookState] = usePrismicDocumentByUID('look', uid);

  const notFound = lookState.state === 'failed';

  useEffect(() => {
    if (lookState.state === 'failed') {
      console.warn(
        'Look document was not found. Make sure it exists in your Prismic repository',
      );
    }
  }, []);

  const videoElement = useRef(null);
  const { togglePlay } = useVideoPlayer(videoElement);

  const [timeLoopToHome, setTimeLoopToHome] = useState(0);

  const handleTimeLoopToHome = () => {
    if (timeLoopToHome) {
      clearInterval(timeLoopToHome);
      setTimeLoopToHome(0);
      return;
    }

    return setInterval(() => {
      setTimeLoopToHome((prevCount) => prevCount + 1);
    }, 1000);
  };

  useEffect(() => {
    setInterval(() => {
      return handleTimeLoopToHome();
    }, 10000);
  }, []);

  if (timeLoopToHome >= 60) {
    return navigate('/looks');
  }

  function changeRoute() {
    navigate('/looks');
  }

  if (look) {
    return (
      <div className="h-screen w-screen">
        {/* <Link
          to="/looks"
          className="absolute p-8 mButtonBackToLooks rounded-full font-bold text-slate-200 bg-indigo-500 hover:bg-indigo-700"
          onClick={changeRoute}
        >
          VOLTAR
        </Link> */}

        <div className="h-screen w-screen">
          <video
            className="h-screen w-screen"
            onClick={togglePlay}
            autoPlay
            loop
            ref={videoElement}
            src={look.data.video_look.url}
          />
        </div>

        <Link
          to="/thanks"
          className="absolute bottom-0 p-8 mButtonFinish rounded-full font-bold text-slate-200 bg-indigo-500 hover:bg-indigo-700"
        >
          FINALIZAR
        </Link>
      </div>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
