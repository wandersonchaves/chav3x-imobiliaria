import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAllPrismicDocumentsByType } from '@prismicio/react';

import { NotFound } from '../NotFount';
import { ImArrowLeft2, ImHome } from 'react-icons/im';

export function Looks() {
  const [idUnitItem, setIdUnitItem] = useState('');

  const [look, lookState] = useAllPrismicDocumentsByType('look');

  const notFound = lookState.state === 'failed';

  useEffect(() => {
    if (lookState.state === 'failed') {
      console.warn(
        'Look document was not found. Make sure it exists in your Prismic repository',
      );
    }
  }, []);

  function handleUnitLookId(clickedItem) {
    // clickedItem.preventDefault();
    setIdUnitItem(clickedItem);

    console.log('idUnitItem', idUnitItem);
  }

  // Return the look if a document was retrieved from Prismic
  if (look) {
    return (
      <div className="bg-white h-screen">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <header className="flex justify-between">
            <Link to="/">
              <ImArrowLeft2 color="#000" />
            </Link>
            <Link to="/">
              <ImHome color="#000" />
            </Link>
          </header>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
            <div key={look[0].id} className="group relative">
              <div className="w-full h-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                <img
                  src={look[0].data.image_look.url}
                  alt={look[0].data.image_look.alt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 overflow-y-auto h-screen">
              {look.map((unitLook) => (
                <div
                  key={unitLook.id}
                  onClick={handleUnitLookId}
                  className="group relative"
                >
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                    <img
                      src={unitLook.data.image_look.url}
                      alt={unitLook.data.image_look.alt}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={unitLook.uid} onClick={handleUnitLookId}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <footer className="flex justify-end">
            <button className=" flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              <Link to="/">
                <ImHome color="#000" />
              </Link>
              ESCOLHER ESTE LOOK
            </button>
          </footer>
        </div>
      </div>
    );
  }

  return null;
}
