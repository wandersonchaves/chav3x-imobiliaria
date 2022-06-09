import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  SliceZone,
  useAllPrismicDocumentsByType,
  usePrismicDocumentByUID,
  useSinglePrismicDocument,
} from '@prismicio/react';

import { components } from '../slices';
import { Layout } from '../../components/Layout';
import { NotFound } from '../NotFount';
import { LookItem } from '../../components/LookItem';

export function Looks() {
  // const { uid } = useParams();
  const [idUnitItem, setIdUnitItem] = useState('');

  const [look, lookState] = useAllPrismicDocumentsByType('look');
  const [menu, menuState] = useSinglePrismicDocument('menu');

  const notFound = lookState.state === 'failed' || menuState.state === 'failed';

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

    console.log("idUnitItem", idUnitItem);
  }

  console.log('look', look);
  // console.log('menu', menu);

  // Return the look if a document was retrieved from Prismic
  if (look && menu) {
    return (
      <Layout wrapperClass="look" menuDoc={menu}>
        {/* <SliceZone slices={look.data.look_content} components={components} /> */}
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
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

              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
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
                            {unitLook.uid}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">branco</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        R$10.00
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <LookItem /> */}
      </Layout>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
