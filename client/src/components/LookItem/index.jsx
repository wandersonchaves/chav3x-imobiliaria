import { usePrismicDocumentByUID } from '@prismicio/react';
import { useContext, useEffect, useRef } from 'react';
import { ImArrowLeft2, ImHome } from 'react-icons/im';
import { Link, useParams } from 'react-router-dom';
import { NotFound } from '../../pages/NotFount';
import { LookContext } from '../LookContext';
import { useVideoPlayer } from '../VideoPlayer';

import './styles.css';

export function LookItem() {
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
      <div className="h-screen w-screen">
        {/* <Link
          className="absolute p-8 mbuttomBack rounded-full text-slate-200 bg-indigo-500 hover:bg-indigo-700"
          to="/looks"
        >
          <ImArrowLeft2 size={50} color="#fff" />
        </Link>
        <Link
          className="absolute p-8 mbuttomHome rounded-full text-slate-200 bg-indigo-500 hover:bg-indigo-700"
          to="/"
        >
          <ImHome size={50} color="#fff" />
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
          className="absolute bottom-0 p-8 mbottomItem rounded-full text-slate-200 bg-indigo-500 hover:bg-indigo-700"
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
