import { PrismicText } from '@prismicio/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';
import { useVideoPlayer } from '../VideoPlayer';

import './styles.css';

export function ThanksBanner({ banner }) {
  const videoElement = useRef(null);
  const { handleOnTimeUpdate } = useVideoPlayer(videoElement);

  return (
    <div className="container">
      <div className="video-wrapper">
        <video
          autoPlay
          loop
          src={banner.video.url}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
        />
        <Link to="/" className="controls">
          HOME
        </Link>
      </div>
    </div>
  );

  // return (
  // <section
  //   className="flex item-center justify-center w-screen h-screen bg-no-repeat bg-cover min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none"
  //   style={{
  //     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${banner.image.url})`,
  //   }}
  // >
  //   <video
  //     autoplay
  //     loop
  //     muted
  //     className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
  //   >
  //     <source src={banner.video.url} type="video/mp4" />
  //   </video>

  //   <div className="banner-content grid gap-4 grid-rows-3 py-4 full-width h-screen">
  //     <h2 className="font-bold flex justify-center items-center text-center text-white text-5xl"></h2>
  //     <h1 className="font-bold flex justify-center items-center text-white text-5xl text-center">
  //       <PrismicText field={banner.title} />
  //     </h1>
  //     <Link
  //       className="fixed bottom-10 right-10 z-10 font-sans text-lg bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
  //       to="/"
  //     >
  //       Home
  //     </Link>
  //     <Footer />
  //   </div>
  // </section>
  // );
}
