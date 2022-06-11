import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAllPrismicDocumentsByType } from '@prismicio/react';

import { NotFound } from '../NotFount';
import { ImArrowLeft2, ImHome } from 'react-icons/im';
import { LookContext } from '../../components/LookContext';

export function Looks() {
  const lookContext = useContext(LookContext);
  const selectedLook = (chosenLook) => () => {
    lookContext.chooseLook(chosenLook);
  };

  const [look, lookState] = useAllPrismicDocumentsByType('look');

  const notFound = lookState.state === 'failed';

  useEffect(() => {
    if (lookState.state === 'failed') {
      console.warn(
        'Look document was not found. Make sure it exists in your Prismic repository',
      );
    }
  }, []);

  if (look) {
    return (
      <div className="bg-slate-100 max-h-screen">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 h-screen">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 h-full">
            <Link className="justify-self-start" to="/">
              <div className="flex items-center justify-center h-16 w-16 bg-indigo-500 hover:bg-indigo-700 rounded-full">
                <ImArrowLeft2 size={25} color="#fff" />
              </div>
            </Link>
            <Link className="justify-self-end" to="/">
              <div className="flex items-center justify-center h-16 w-16 bg-indigo-500 hover:bg-indigo-700 rounded-full">
                <ImHome size={25} color="#fff" />
              </div>
            </Link>
            <div className="group relative">
              <div className="w-full h-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                <img
                  src={lookContext.chosenLook.undefined}
                  alt={look[0].data.image_look.alt}
                  className="w-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 overflow-y-scroll overflow-hidden h-full">
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
                          onClick={selectedLook(unitLook.data.image_look.url)}
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
            {/* TODO: organizar unitLook ao chegar para trazer os dados corretos na CONTEXTAPI */}
            <Link
              to="/"
              className="flex items-center justify-center h-16 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
            >
              ESCOLHER ESTE LOOK
            </Link>
          </div>
          <footer className="flex justify-end"></footer>
        </div>
      </div>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
