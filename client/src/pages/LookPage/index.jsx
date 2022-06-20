import { usePrismicDocumentByUID } from '@prismicio/react';
import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NotFound } from '../NotFount';
import { useVideoPlayer } from '../../components/VideoPlayer';

import './styles.css';
import { Loading } from '../../components/Loading';

export function LookPage() {
  const { uid } = useParams();

  const [look, lookState] = usePrismicDocumentByUID('look', uid);

  const notFound = lookState.state === 'failed';
  const loading = lookState.state === 'loading';

  useEffect(() => {
    if (lookState.state === 'failed') {
      console.warn(
        'Homepage document was not found. Make sure it exists in your Prismic repository.',
      );
    } else if (lookState.state === 'loading') {
      console.warn('Loading...');
    }
  }, [lookState.state]);

  const videoElement = useRef(null);
  const { togglePlay } = useVideoPlayer(videoElement);

  if (look) {
    return (
      <div className="h-screen w-screen">
        {/* <Link
          to="/looks"
          className="absolute p-8 mButtonBackToLooks rounded-full font-bold text-slate-200 bg-orange-500 hover:bg-orange-700"
        >
          <ImArrowLeft2 size={25} color="#fff" />
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
          className="absolute bottom-0 p-8 mButtonFinish rounded-full font-bold text-slate-200 bg-orange-500 hover:bg-orange-700"
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
