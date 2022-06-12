import { PrismicText } from '@prismicio/react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';

import './styles.css';

export function HomepageBanner({ banner }) {
  return (
    <div className="container">
      <div className="video-wrapper">
        <video
          autoPlay
          loop
          src={banner.video.url}
          // ref={videoElement}
          // onTimeUpdate={handleOnTimeUpdate}
        />
      </div>
      <Link to="/looks" className="controls">
        ESCOLHA SEU LOOK
      </Link>
    </div>
  );
}
