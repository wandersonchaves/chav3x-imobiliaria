import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAllPrismicDocumentsByType } from '@prismicio/react';

import { NotFound } from '../NotFount';
import { ImArrowLeft2, ImHome } from 'react-icons/im';
import { LookContext } from '../../components/LookContext';
import { useState } from 'react';

export function Looks() {
  const atualLook = useContext(LookContext);
  // const selectedLook = (chosenLook) => () => {
  //   atualLook.chosenLook(chosenLook);
  // };

  const itemSelected = (clickedLook) => () => {
    atualLook.chosenLook(clickedLook);
  };

  // const lookSelected = Object.keys(atualLook.atualLook).reduce((prev, curr) => {
  //   return atualLook.atualLook[curr];
  // }, 0);

  let [lookSelected, setLookSelected] = useState({});
  useEffect(() => {
    setLookSelected(
      Object.keys(atualLook.atualLook).reduce((prev, curr) => {
        return atualLook.atualLook[curr];
      }, 0),
    );
  }, [atualLook]);

  console.log(lookSelected);

  // const result = itemSelected.look;

  const [look, lookState] = useAllPrismicDocumentsByType('look');

  const notFound = lookState.state === 'failed';

  useEffect(() => {
    if (lookState.state === 'failed') {
      console.warn(
        'Look document was not found. Make sure it exists in your Prismic repository',
      );
    }
  }, []);

  // const teste = Object.keys(
  //   atualLook.chosenLook((key) => {
  //     return key;
  //   }),
  // );

  // const result = atualLook.chosenlook((key) => {
  //   return key;
  // });

  if (look) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        style={
          {
            // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${look[0].data.banner.url})`,
          }
        }
      >
        <div className="h-full w-full max-w-screen-md relative flex justify-center overflow-hidden rounded-xl">
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
              {/* <pre>{JSON.stringify(atualLook, null, 2)}</pre> */}
            </Link>

            <div className="w-full h-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
              <img
                // src={
                //   lookSelected.length
                //     ? lookSelected.data.image_look.url
                //     : look[0].data.image_look.url
                // }
                alt={look[0].data.image_look.alt}
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
            {/* TODO: organizar unitLook ao chegar para trazer os dados corretos na CONTEXTAPI */}
            <Link
              to="/looks/look-1"
              // to={`/looks/${lookSelected.data.image_look.url}`}
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
