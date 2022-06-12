import { PrismicText } from '@prismicio/react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';

export const ThanksBanner = ({ banner }) => (
  <section
    className="flex item-center justify-center w-full h-screen bg-no-repeat bg-cover object-cover  bg-no-repeat object-cover min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${banner.image.url})`,
    }}
  >
    <div className="banner-content grid gap-4 grid-rows-3 py-4 full-width h-screen">
      <h2 className="font-bold flex justify-center items-center text-white text-5xl">
        <PrismicText field={banner.title} />
      </h2>
      <h1 className="font-bold flex justify-center items-center text-white text-5xl"></h1>
      <Link
        className="fixed bottom-10 right-10 z-10 font-sans text-lg bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
        to="/"
      >
        Home
      </Link>
      <Footer />
    </div>
  </section>
);
