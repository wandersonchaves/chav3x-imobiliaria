import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAllPrismicDocumentsByType } from '@prismicio/react';

import { NotFound } from '../NotFount';
import { ImArrowLeft2, ImHome } from 'react-icons/im';
import { LookContext } from '../../components/LookContext';

export function Looks() {
  const [look, lookState] = useAllPrismicDocumentsByType('look');
  const [lookSelected, setLookSelected] = useState({});

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

  const atualLook = useContext(LookContext);

  const itemSelected = (clickedLook) => () => {
    atualLook.chosenLook(clickedLook);
  };

  useEffect(() => {
    setLookSelected(
      Object.keys(atualLook.atualLook).map((key) => {
        return atualLook.atualLook[key];
      }),
    );
  }, [atualLook]);

  if (look) {
    return (
      <div
        className="flex justify-center h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${look[0].data.banner.url})`,
        }}
      >
        <div className="max-w-screen-md relative flex justify-center overflow-hidden rounded-xl">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 w-full">
            <Link className="justify-self-start self-end" to="/">
              <div className="flex items-center justify-center h-16 w-16 bg-indigo-500 hover:bg-indigo-700 rounded-full">
                <ImArrowLeft2 size={25} color="#fff" />
              </div>
            </Link>
            <Link className="justify-self-end self-end" to="/">
              <div className="flex items-center justify-center h-16 w-16 bg-indigo-500 hover:bg-indigo-700 rounded-full">
                <ImHome size={25} color="#fff" />
              </div>
            </Link>

            <div className="w-full h-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
              <img
                src={lookSelected[0].data.image_look.url}
                alt={lookSelected[0].data.image_look.alt}
                className="w-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>

            <div className="bg-gray-300 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 rounded-md overflow-hidden h-full">
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
                          onClick={itemSelected(unitLook)}
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
              to={`/looks/${lookSelected[0].uid}`}
              className="flex items-center justify-center h-16 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
            >
              ESCOLHER ESTE LOOK
            </Link>
          </div>
          <footer className="flex justify-end"></footer>
        </div>
      </div>
    );
  } else if (loading) {
    return <p>Loading...</p>;
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
