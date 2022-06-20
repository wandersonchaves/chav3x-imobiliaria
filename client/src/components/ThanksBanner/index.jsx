import { useRef } from 'react';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { useVideoPlayer } from '../VideoPlayer';

import './styles.css';

export function ThanksBanner({ banner }) {
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
        className="absolute bottom-0 p-8 mButtonToHome rounded-full text-slate-200 bg-indigo-500 hover:bg-indigo-700"
      >
        <ImHome size={75} color="#fff" />
      </Link>
    </div>
  );
}
