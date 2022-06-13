import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useVideoPlayer } from '../VideoPlayer';

import './styles.css';

export function ThanksBanner({ banner }) {
  const videoElement = useRef(null);
  const { togglePlay } = useVideoPlayer(videoElement);

  return (
    <div className="container">
      <div className="bg-indigo-500 video-wrapper">
        <video
          className="w-screen"
          onClick={togglePlay}
          autoPlay
          loop
          ref={videoElement}
          src={banner.video.url}
        />
      </div>
      <Link
        to="/"
        className="mb-96 text-slate-200 bg-indigo-500 hover:bg-indigo-700 controls"
      >
        HOME
      </Link>
    </div>
  );
}
