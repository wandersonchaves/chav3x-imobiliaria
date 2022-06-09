import { PrismicText, PrismicLink } from '@prismicio/react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';

export const HomepageBanner = ({ banner }) => (
  <section
    className="homepage-banner h-screen bg-no-repeat bg-cover"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${banner.image.url})`,
    }}
  >
    <div className="banner-content grid gap-4 grid-rows-3 py-4 full-width h-screen">
      <h2 className="font-bold flex justify-center items-center text-white text-5xl">
        <PrismicText field={banner.title} />
      </h2>
      <h1 className="font-bold flex justify-center items-center text-white text-5xl">
        <PrismicText field={banner.tagline} />
      </h1>
      <Link
        className="fixed bottom-10 right-10 z-10 font-sans text-lg bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
        to="/looks"
      >
        Monte seu look
      </Link>
      <Footer />
    </div>
  </section>
);
