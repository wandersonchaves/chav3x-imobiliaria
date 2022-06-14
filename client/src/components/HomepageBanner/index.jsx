import { useRef } from 'react';
import { ImArrowRight2 } from 'react-icons/im';
import { Link } from 'react-router-dom';
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
        className="absolute bottom-4 p-8 right-1/4 mbottom rounded-full text-slate-200 bg-indigo-500 hover:bg-indigo-700"
        to="/looks"
      >
        <ImArrowRight2 size={100} color="#fff" />
      </Link>
    </div>
  );
}
