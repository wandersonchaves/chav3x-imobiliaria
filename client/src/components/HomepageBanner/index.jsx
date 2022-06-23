import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';
import { useVideoPlayer } from '../VideoPlayer';

import './styles.css';

export function HomepageBanner({ banner }) {
  const videoElement = useRef(null);
  const { togglePlay } = useVideoPlayer(videoElement);

  return (
    <div className="h-screen w-screen">
      <div className="h-screen w-screen">
        <video
          className="h-screen w-screen"
          onClick={togglePlay}
          autoPlay
          loop
          ref={videoElement}
          src={banner.video.url}
        />
      </div>
      <Link
        className="absolute bottom-0 p-8 mButtonToHouses rounded-full font-bold text-white bg-orange-500 hover:bg-orange-700"
        to="/houses"
      >
        CLIQUE AQUI
      </Link>
      <Footer />
    </div>
  );
}
