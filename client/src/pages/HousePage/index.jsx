import { usePrismicDocumentByUID } from '@prismicio/react';
import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
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

  if (house) {
    return (
      <div className="h-screen w-screen">
        {/* <Link
          to="/houses"
          className="absolute p-8 mButtonBackToHouses rounded-full font-bold text-slate-200 bg-orange-500 hover:bg-orange-700"
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
            src={house.data.video.url}
          />
        </div>

        <Link
          to="/congrats"
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
