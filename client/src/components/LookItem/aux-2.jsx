import { usePrismicDocumentByUID } from '@prismicio/react';
import { useContext, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NotFound } from '../../pages/NotFount';
import { LookContext } from '../LookContext';
import { useVideoPlayer } from '../VideoPlayer';

import './styles.css';

export function Aux2() {
  const lookContext = useContext(LookContext);
  const finishLook = (chosenLook) => () => {
    lookContext.finishLook(chosenLook);
  };

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

  if (look) {
    return (
      <div className="container">
        <div className="bg-indigo-500 video-wrapper">
          <video
            className="w-screen"
            onClick={togglePlay}
            autoPlay
            loop
            ref={videoElement}
            src={look.data.video_look.url}
          />
        </div>
        <Link
          to="/thanks"
          className="mb-96 text-slate-200 bg-indigo-500 hover:bg-indigo-700 controls"
          onClick={finishLook(look)}
        >
          FINALIZAR ESCOLHA
        </Link>
      </div>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
