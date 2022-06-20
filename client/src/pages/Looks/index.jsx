import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAllPrismicDocumentsByType } from '@prismicio/react';

import { NotFound } from '../NotFount';
import { ImArrowLeft2, ImHome } from 'react-icons/im';
import { Loading } from '../../components/Loading';
import { useLook } from '../../components/LookContext';

export function Looks() {
  const atualLook = useLook();
  const newLookContext = (clickedLook) => () => {
    atualLook.chosenLook(clickedLook);
  };
  console.log(atualLook);

  const [look, lookState] = useAllPrismicDocumentsByType('look');

  const notFound = lookState.state === 'failed';
  const loading = lookState.state === 'loading';

  useEffect(() => {
    if (lookState.state === 'failed') {
      console.warn(
        'Look document was not found. Make sure it exists in your Prismic repository.',
      );
    } else if (lookState.state === 'loading') {
      console.warn('Loading...');
    }
  }, [lookState.state]);

  if (look) {
    return (
      <div
        className="h-screen w-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${atualLook.atualLook.data.background.url})`,
        }}
      >
        <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden rounded-xl">
          <div className="h-screen grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 w-full">
            <Link
              className="absolute z-10 p-8 mButtonToHome rounded-full font-bold text-slate-200 bg-indigo-500 hover:bg-indigo-700"
              to="/"
            >
              <ImArrowLeft2 size={25} color="#fff" />
            </Link>
            {/* <br /> */}

            <div className="w-full h-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
              <img
                src={atualLook.atualLook.data.image_look.url}
                alt={atualLook.atualLook.data.image_look.alt}
                className="lg:w-full lg:h-full"
              />
            </div>

            <div className="bg-gray-300 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 rounded-md overflow-y-auto h-full">
              {look.map((unitLook) => (
                <div key={unitLook.id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                    <img
                      src={unitLook.data.image_look.url}
                      alt={unitLook.data.image_look.alt}
                      className="w-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span
                          onClick={newLookContext(unitLook)}
                          aria-hidden="true"
                          className="absolute inset-0"
                        />
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <Link
              to={`/looks/${atualLook.atualLook.uid}`}
              className="flex items-center justify-center h-28 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              ESCOLHER ESTE LOOK
            </Link>
          </div>
          <footer className="flex justify-end"></footer>
        </div>
      </div>
    );
  } else if (loading) {
    return <Loading />;
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
