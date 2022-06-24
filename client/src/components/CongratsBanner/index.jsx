import { useRef } from 'react';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { useVideoPlayer } from '../VideoPlayer';

import './styles.css';

export function CongratsBanner({ banner }) {
  const videoElement = useRef(null);
  const { togglePlay } = useVideoPlayer(videoElement);

  return (
    <div className="h-screen w-screen">
      <div className="w-screen h-screen">
        <video
          className="w-screen h-screen"
          onClick={togglePlay}
          autoPlay
          loop
          ref={videoElement}
          src={banner.video.url}
        />
      </div>
      <Link
        to="/"
        className="absolute bottom-0 p-8 mButtonToHome rounded-full text-white bg-lime-500 hover:bg-lime-600"
      >
        <ImHome size={50} color="#fff" />
      </Link>
    </div>
  );
}
