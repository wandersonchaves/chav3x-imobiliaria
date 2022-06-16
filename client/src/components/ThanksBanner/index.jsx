import { useEffect, useRef, useState } from 'react';
import { ImHome } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { useVideoPlayer } from '../VideoPlayer';

import './styles.css';

export function ThanksBanner({ banner }) {
  const navigate = useNavigate();

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
    return navigate('/');
  }

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
        className="absolute bottom-0 p-8 mbottomThanks rounded-full text-slate-200 bg-indigo-500 hover:bg-indigo-700"
      >
        <ImHome size={75} color="#fff" />
      </Link>
    </div>
  );
}
